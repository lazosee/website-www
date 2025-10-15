export function titleTemplate(
	title?: string,
	base: string = 'The Osee Archives',
	sep: '|' | '-' = '|'
) {
	return title ? `${title} ${sep} ${base}` : base
}

export function is<T>(t: T, v: any) {
	return v == t
}
