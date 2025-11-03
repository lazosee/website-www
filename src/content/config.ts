import { defineCollection, reference, z } from 'astro:content'

const categories = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string({}),
		slug: z.string({}),
	}),
})

const posts = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			snippet: z.string(),
			category: z.string(reference('categories')),
			cover: image(),
			published_at: z.coerce.date(),
			updated_at: z.coerce.date(),
			tags: z.array(z.string()).optional(),
			related: z.array(reference('posts')).optional(),
		}),
})

export const series = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			slug: z.string(),
			cover: image(),
			title: z.string(),
		}),
})

export const tutorials = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			snippet: z.string(),
			series: z.string(reference('series')),
			series_index: z.coerce.number(),
			cover: image(),
			published_at: z.coerce.date(),
			updated_at: z.coerce.date(),
			tags: z.array(z.string()).optional(),
			related: z.array(reference('posts')).optional(),
		}),
})

export const collections = { posts, categories, tutorials, series }
