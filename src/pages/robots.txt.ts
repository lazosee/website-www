import type { APIRoute } from 'astro'

export const GET: APIRoute = async (context) => {
	const robotsTxt = `User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: ${new URL('sitemap-index.xml', context.url.href)}
`
	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	})
}
