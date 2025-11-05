import { TITLE } from '@/data/nav'
import { blog_url } from '@/utils'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export const prerender = true

export async function GET(context: APIContext) {
	const posts = await getCollection('posts')

	return rss({
		trailingSlash: false,
		// stylesheet: '/rss/styles.xsl',
		title: TITLE,
		description:
			'Explore a collection of all posts by Lazaro Osee on architecture, design, creativity and software',
		site: context.site ?? 'https://www.lazaroosee.xyz',
		customData: `<language>en-us</language>`,
		items: posts.map((post) => ({
			...post.data,
			title: post.data.title,
			description: post.data.snippet,
			pubDate: post.data.published_at,
			link: blog_url(post.slug, post.data.published_at),
		})),
	})
}
