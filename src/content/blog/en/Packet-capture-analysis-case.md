---
title: "Finding an SMTP STARTTLS Failure with TCP Sequence Analysis"
description: "How dual-segment packet captures, SACK blocks, and cross-path comparison exposed a TLS handshake gap caused by likely MTU/PMTUD issues."
pubDate: 2026-08-11
heroImage: "/post_img.webp"
badge: "Network"
tags: ["tcp", "pcap", "smtp", "tls", "mtu", "troubleshooting"]
translationKey: "smtp-starttls-pmtud-case"
---

A firewall log reported an SMTP session ending abnormally. Human review suggested TLS could not be established. Packet captures from multiple network segments told a clearer story: **STARTTLS succeeded, but the server’s TLS handshake flight arrived incomplete at the client**.

## Symptom

- Client on the internal mail relay network
- Failed destination: a third-party SMTP server on port 25
- Working comparison: a major public mail provider on port 25

Both paths completed:

1. TCP handshake
2. SMTP banner and `EHLO`
3. `STARTTLS` and `220 Ready to start TLS`
4. ClientHello

Only the failed path stalled after ClientHello.

## What looked like TLS failure

Wireshark on the failed capture sometimes labeled traffic as **TLS 1.0**, which was misleading.

The ClientHello used the common compatibility pattern:

```text
Record version:      03 01  (TLS 1.0 at record layer)
Handshake version:   03 03  (TLS 1.2 inside ClientHello)
```

The real problem was not “client only offered TLS 1.0.” The **ServerHello and certificate chain never arrived contiguously**.

## The smoking gun: a sequence gap

After ClientHello, the client expected the next server byte at sequence number **N**.

The next server segment seen on the wire started at sequence number **N + 2896**.

Gap:

```text
2896 bytes missing
```

The client sent SACK:

```text
Cumulative ACK: N
SACK block:     N+2896 to N+4096
```

Meaning:

```text
Missing:               N to N+2895           (2896 bytes)
Received out-of-order: N+2896 to N+4095       (1200 bytes)
```

A second retry on another ephemeral client port showed the same pattern with a different sequence range.

## Why two packets were inferred

On the failed path, TCP timestamps were enabled:

```text
TCP payload: 1448 bytes
TCP header:    32 bytes
IPv4 header:   20 bytes
Total:       1500-byte IP packet
```

So:

```text
2896 ÷ 2 = 1448
```

Two full-sized server segments were likely dropped. A smaller later segment survived:

```text
1200-byte TCP payload
1252-byte IP packet
DF set
```

## Cross-capture evidence

The same session was captured at two points along the path:

- An internal load-balancer segment
- A WAN/router segment closer to the internet edge

Both showed:

| Observation | Internal capture | WAN capture |
|---|---|---|
| Client expects next byte | N | N |
| Next server SEQ seen | N + 2896 | N + 2896 |
| Later segment size | 1200 bytes | 1200 bytes |
| Missing range present? | No | No |

Expected but absent packets:

```text
SEQ N,       len 1448
SEQ N+1448,  len 1448
```

Because the gap existed at **both** capture points, the loss likely happened **before traffic reached either segment**, not between them.

## Successful path: same loss, different recovery

The working public mail provider showed almost the same initial loss:

```text
Expected:     M
Next seen:    M + 2920
Missing:      2920 bytes (= 1460 × 2)
```

The client again sent SACK for the out-of-order block. The difference was recovery:

- The provider retransmitted after a few seconds
- Retransmissions used **smaller IP packets (~576 bytes)**
- **DF was cleared** on recovery packets
- TLS 1.2 completed successfully

Negotiated result on the successful path:

```text
TLS 1.2
Modern ECDHE + AES-GCM cipher suite
```

The failed server sent no visible retransmission of the missing range. The client waited about 90 seconds, closed, and the server eventually returned a late `decode_error` alert after the session was already dead.

## Likely root cause

This pattern fits an **MTU / PMTUD black hole**:

- Large ~1500-byte packets disappear
- Smaller packets pass
- DF is set on the surviving traffic
- ICMP “Fragmentation Needed” was not observed
- One server recovers with smaller retransmissions; the other does not

Less likely explanations:

- TLS cipher mismatch
- Certificate rejection
- SNI mismatch alone

Those usually fail faster and produce clearer TLS alerts, not a long wait with a sequence hole.

## Tools used

Analysis was done with:

- **Python 3 + Scapy** for flow grouping, seq/ack math, SACK/MSS parsing
- **Raw byte scanning** for one vendor export, because its PCAP wrapper truncated TCP options
- **Wireshark-style fields** for validation: `tcp.seq_raw`, `tcp.ack_raw`, `tcp.options.sack`

Minimal Scapy pattern:

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

The packet-loss conclusion came from simple arithmetic:

```python
missing = next_server_seq - client_cumulative_ack
```

## Recommended next steps

1. Capture simultaneously on server egress, WAN, and internal segments.
2. Check for dropped ICMP type 3 code 4 (“Fragmentation Needed”).
3. Verify tunnel/interface MTU end-to-end.
4. Temporarily clamp MSS to **1360 or lower** on the affected path.
5. Compare server TCP stack behavior: retransmission, PMTUD, and DF handling.
6. In Wireshark, disable relative TCP sequence numbers when correlating raw seq values across captures.

## Takeaway

When TLS “fails to establish,” do not stop at the TLS decoder. Check whether the TCP byte stream is complete first. In this case, **SACK plus identical sequence gaps across two capture points** turned a vague “TLS problem” into a transport-layer evidence trail pointing to MTU-related packet loss and poor recovery behavior on the failing SMTP server.
