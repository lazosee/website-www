import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
	// 1. Admin route protection
	if (
		context.url.pathname == '/admin' ||
		(context.url.pathname.startsWith('/admin/') && context.url.pathname !== '/admin/login')
	) {
		const isAuthenticated = context.cookies.has('auth')
			? context.cookies.get('auth')!.value ===
			  Buffer.from(
					`${import.meta.env.ADMIN_USERNAME}:${import.meta.env.ADMIN_PASSWORD}`,
					'utf-8'
			  ).toString('base64')
			: false

		if (!isAuthenticated) {
			return context.redirect('/admin/login?error=invalid_credentials', 307)
		}

		return next()
	}

	// Finally, Proceed to next middleware or route handler
	return next()
})
