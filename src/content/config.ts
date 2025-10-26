import { file } from 'astro/loaders'
import { defineCollection, reference, z } from 'astro:content'

const categories = defineCollection({
	loader: file('src\\content\\categories.json'),
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
			related: z.array(z.string(reference('posts'))).optional(),
			views: z.coerce.number(),
			likes: z.coerce.number(),
		}),
})

export const collections = { posts, categories }
