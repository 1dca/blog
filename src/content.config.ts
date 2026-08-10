import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "tags must be unique",
    })
    .default([]),
  /** Shared key linking EN/ZH translations of the same post. */
  translationKey: z.string().optional(),
  draft: z.boolean().default(false),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: blogSchema,
});

export const collections = { blog };
