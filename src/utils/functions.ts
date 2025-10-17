import { TITLE } from '@/data/nav'

export function titleTemplate(title?: string, base: string = TITLE, sep: '|' | '-' = '|') {
	return title ? `${title} ${sep} ${base}` : base
}

export function is<T>(t: T, v: any) {
	return v == t
}
