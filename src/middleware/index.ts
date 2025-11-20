import { defineMiddleware } from 'astro:middleware'

/** Converts a UTF-8 string to a Base64 string. */
function utf8ToBase64(str: string): string {
	// Use TextEncoder to handle UTF-8 bytes reliably, then convert those bytes to Base64 ASCII
	return btoa(unescape(encodeURIComponent(str)))
}

/** Converts a Base64 string back to a UTF-8 string. */
function base64ToUtf8(base64: string): string {
	// Convert Base64 ASCII to raw ASCII, then decode the raw ASCII as UTF-8
	return decodeURIComponent(escape(atob(base64)))
}

export const onRequest = defineMiddleware(async (context, next) => {
	// 1. Admin route protection
	if (
		context.url.pathname == '/admin' ||
		(context.url.pathname.startsWith('/admin/') && context.url.pathname !== '/admin/login')
	) {
		const isAuthenticated = context.cookies.has('auth')
			? context.cookies.get('auth')!.value ===
			  utf8ToBase64(`${import.meta.env.ADMIN_USERNAME}:${import.meta.env.ADMIN_PASSWORD}`)
			: //   Buffer.from(
			  // 		`${import.meta.env.ADMIN_USERNAME}:${import.meta.env.ADMIN_PASSWORD}`,
			  // 		'utf-8'
			  //   ).toString('base64')
			  false

		if (!isAuthenticated) {
			return context.redirect('/admin/login?error=invalid_credentials', 307)
		}

		return next()
	}

	// Finally, Proceed to next middleware or route handler
	return next()
})
