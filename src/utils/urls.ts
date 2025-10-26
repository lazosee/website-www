export function blog_url(slug: string, date: Date) {
	return `/posts/${date.getUTCFullYear()}/${slug}`
}
