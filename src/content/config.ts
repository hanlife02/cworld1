import { defineCollection, z } from 'astro:content'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

const post = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().min(10).max(160),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      // Optional
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      heroImage: z
        .object({
          src: z.union([image(), z.string()]),
          alt: z.string().optional(),
          color: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      draft: z.boolean().default(false),
      // Integrations
      comment: z.boolean().default(true)
    })
})

export const collections = { post }
