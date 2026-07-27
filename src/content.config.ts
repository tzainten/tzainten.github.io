import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
    generateId: ({ entry }) => {
      const segments = entry.split("/");
      return segments.length > 1
        ? segments[segments.length - 2]
        : segments[0].replace(/\.md$/, "");
    },
  }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    language: z.string(),
    year: z.number().int(),
    rating: z.number().default(0),
    size: z.string().optional(),
    license: z.string().optional(),
    deps: z.string().optional(),
    source: z.string().url().optional(),
  }),
});

export const collections = { projects };
