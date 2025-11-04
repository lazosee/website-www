import { getCollection } from 'astro:content'

export async function getLatestPosts(count: number = 5) {
	return (await getCollection('posts'))
		.sort((a, b) => b.data.published_at.valueOf() - a.data.published_at.valueOf())
		.slice(0, count)
		.map((post) => ({
			...post.data,
			slug: post.slug,
			id: post.id,
		}))
}
