export function blog_url(slug: string, date: Date) {
	return `${date.getUTCFullYear()}/${slug}`
}
