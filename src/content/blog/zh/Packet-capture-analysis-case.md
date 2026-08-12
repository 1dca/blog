---
title: "邮件延迟排查"
description: "通过双段抓包、SACK 与跨路径对比，定位到很可能由 MTU/PMTUD 问题导致的 TLS 握手证书交换缺口。"
pubDate: 2026-07-21
heroImage: "/post_img.webp"
badge: "Network"
tags: ["packet-capture", "troubleshooting"]
translationKey: "smtp-starttls-pmtud-case"
---

记一次生产环境排查：花了好几个小时才把根因抠出来。网络变更后的第二天，用户开始偶发邮件延迟。变更记录和配置翻了无数遍，也没看出端倪。最终还是多段同时抓包把故事讲清楚了：

**本地 SMTP 与外部服务之间，TLS 在证书交换阶段失败了。**

## 现象

- 部分用户反馈邮件延迟约 20 分钟

## 拓扑

```text
 Internet
    |
    v
+----------------------+
| 48.218.xx.xx         |
| External SMTP server |
+----------------------+
    |
    v
+----------+
|  Akamai  |
+----------+
    |
    |  *** Capture point 1 ***
    v
+-------------+
| WAN Router  |
+-------------+
    |
    v
+------+
|  FW  |
+------+
    |
    v
+--------------+
| Leaf Switch  |
+--------------+
    |
    |  *** Capture point 2 ***
    v
+--------+
|  LTM   |
+--------+
    |
    v
+-------------------+
| 10.x.x.x          |
| Local SMTP server |
+-------------------+
```

## 根因

证书交换相关报文在 **Akamai → WAN Router** 的入向路径上丢失。

为什么重要：Akamai 对 GRE 类路径的包长很严格——边缘路由器要求 **MSS ≤ 1436**（VPN 集中器还要更低）。带 DF 的过大报文不会分片，只会直接消失。

为什么影响是部分的：有些入向流量并不走 Akamai。

## 排查过程

1. 查了 FW / 路由 / LTM 配置和日志——没有任何“就是它”的信号。
2. 应用团队指出了具体出问题的 SMTP 服务器。
3. 在服务器出口、WAN、内网段同时抓包。
   - 把失败点收窄到 TLS 证书交换阶段。
4. 对比延迟会话与正常会话：
   - 正常会话：重传允许 IP 分片（`DF = 0`）。
   - 异常会话：DF 保持置位（`DF = 1`），过大报文无法分片。
   - 正常会话 TCP MSS 峰值约 **1318**；异常会话约 **1200**。关键并不是“MSS 比 Akamai 的 1436 上限还高”，而是 **DF + 静默丢包**——异常路径即使 MSS 更小，也恢复不好。
5. 用 TCP 序号精确定位丢掉了哪些包。见 **3. 累计 ACK 与 SACK 如何暴露缺口**。
6. 查 Akamai 日志——有丢包记录。
7. 临时处理：在受影响路径上把 MSS clamp 到 **1360 或更低**。
8. 业务侧复测正常。

## 技术笔记

如果你是这类 case 里的网络同学，下面几点值得备着。

### 1. 在 Wireshark 里看原始 TCP 序号

Wireshark 默认显示**相对** seq/ack（该会话第一个报文变成 `0`）。阅读友好，但跨设备对比抓包——或丢进脚本——时，你要的是报文头里的真实值。

- 设置：**Edit → Preferences → Protocols → TCP** → 取消勾选 **Relative sequence numbers**
- 或者保持相对显示，用 `tcp.seq_raw` / `tcp.ack_raw` 过滤和对比

官方说明：[Wireshark Wiki — TCP Relative Sequence Numbers](https://wiki.wireshark.org/TCP_Relative_Sequence_Numbers)

### 2. SMTP STARTTLS 会话是怎么建起来的

一开始我有点担心：会不会只能看到加密乱码，看不到有用的协议状态。实际上服务器用的是 STARTTLS：加密跑在 25 端口的普通 TCP 会话之上，所以经典 TCP 分析方法仍然有效。

细节：

1. 客户端先明文连接（通常 25 / 587）。
2. `EHLO` → 服务器通告 `STARTTLS`。
3. 客户端发 `STARTTLS` → 服务器回 `220 Ready to start TLS`。
4. 双方在同一条 TCP 连接上做正常 TLS 握手。← **丢包发生在这里**；它仍然是 TCP 会话，你还能看到 ACK、Seq、Flags。
5. TLS 成功后，双方丢弃 TLS 之前的 SMTP 状态；客户端必须在加密通道上重新 `EHLO`。

因此，如果 **ServerHello / Certificate** 的字节在 TCP 上无法连续到达，SMTP 就拿不到可用的 TLS 会话——应用侧只表现为“慢”或“卡住”。

抓包里的 ClientHello 用了常见兼容写法：

```text
Record version:      03 01  (记录层 TLS 1.0)
Handshake version:   03 03  (ClientHello 内 TLS 1.2)
```

Wireshark 里会话显示成 TLS 1.0，确实误导了我。这**不代表**“客户端只提供 TLS 1.0”。真正的问题是：证书链从未形成完整、连续的字节流。

### 3. 累计 ACK 与 SACK 如何暴露缺口

TCP 给流中每个字节编号。接收端会告诉发送端两件事：

- **累计 ACK**——“这个数字之前的字节我都有了；下一个请从这个字节开始发。”
- **SACK 块**——“我还乱序收到了后面这一段。”

本例中，累计 ACK 与 SACK 左边界之间的全部数据都是**缺失的**。可视化一下：客户端已经收到服务端数据到字节 **N−1**。ClientHello 之后，它在等字节 **N**（TLS ServerHello 飞行的起点）。

```text
Server byte stream (sequence numbers):

  ... |████████████|░░░░░░░░░░░░|████|
      received OK   MISSING 2896   received
      ... N-1       N ... N+2895   N+2896 ... N+4095
                    ↑              ↑
              cumulative ACK       SACK left edge
              (= N)                (= N+2896)
```

图例：

- `█` — 已按序收到并确认
- `░` — 从未收到（空洞）
- 尾部 `█` — **乱序**收到（后面的段先到了）

#### 具体怎么分析

Wireshark 把空洞落到了具体数字上。报文 22 是客户端在 25 端口上的 ACK，带一个 SACK 块：

![Wireshark TCP SACK 块：左边界 4294115359，右边界 4294116559](/blog1/1.png)

从该报文可读出：

| 字段 | 值 |
| --- | --- |
| 期望数据 | `4294112463`–`4294116559` |
| 累计 ACK | `4294112463` |
| SACK 块 | `4294115359`–`4294116559` |
| 缺失区间 | `4294112463`–`4294115358` |

```text
4294115359 − 4294112463 = 2896 字节缺失
```

这段空洞至少对应两个 **1448 字节**的段：

```text
期望段 1: SEQ 4294112463, length 1448
期望段 2: SEQ 4294113911, length 1448
实际下一段: SEQ 4294115359   ← SACK 左边界
```

带 **`DF=1`** 的 **1448 字节**报文，在这条路径上基本过不了 Akamai。后来 Akamai 日志也印证了丢包。

### 4. 厂商特定的 MTU / MSS 要求

隧道（GRE、IPsec 等）会吃掉头开销。厂商常会公布硬性的 MSS 上限，好让客户流量在封装后仍能塞进路径。

Akamai Prolexic Routed GRE 明确要求：

> Support for TCP MSS adjustment: **1436 MSS**（边缘路由器）和 **1380 MSS**（VPN 集中器）

来源：[Akamai Services Descriptions (PDF)](https://www.akamai.com/site/en/documents/corporate/akamai-services-descriptions.pdf)

TLS 证书报文往往是握手开始后第一段“大”载荷，所以一开始很像 TLS 问题。

## 使用的工具

分析用到：

- **Python 3 + Scapy**：流归组、seq/ack 计算、SACK/MSS 解析
- **Wireshark 字段**校验：`tcp.seq_raw`、`tcp.ack_raw`、`tcp.options.sack`

最小 Scapy 示例：

```python
from scapy.all import rdpcap, IP, TCP

pkts = rdpcap("capture.pcap")
for i, p in enumerate(pkts, 1):
    if not p.haslayer(TCP):
        continue
    ip, t = p[IP], p[TCP]
    sacks = [v for k, v in t.options if k == "SAck"]
    print(i, f"{ip.src}:{t.sport} -> {ip.dst}:{t.dport}",
          f"seq={t.seq} ack={t.ack}", sacks)
```

丢包结论来自这行简单算术：

```python
missing = next_server_seq - client_cumulative_ack
```

## 小结

当 TLS “建连失败”时，别停在 TLS 解码器。先确认 TCP 字节流是否完整。这个 case 里，**SACK 加上两个抓包点上相同的序号缺口**，把含糊的“TLS 问题”变成了传输层证据链，指向 MTU 相关丢包以及异常 SMTP 路径上偏弱的恢复行为。

## 参考

- Wireshark 相对/原始序号：[https://wiki.wireshark.org/TCP_Relative_Sequence_Numbers](https://wiki.wireshark.org/TCP_Relative_Sequence_Numbers)
- SMTP STARTTLS：[RFC 3207](https://www.rfc-editor.org/rfc/rfc3207)
- TCP SACK：[RFC 2018](https://www.rfc-editor.org/rfc/rfc2018)
- Akamai GRE MSS（1436 / 1380）：[https://www.akamai.com/site/en/documents/corporate/akamai-services-descriptions.pdf](https://www.akamai.com/site/en/documents/corporate/akamai-services-descriptions.pdf)
