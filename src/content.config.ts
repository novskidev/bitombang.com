import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
