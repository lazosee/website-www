import { TITLE } from '@/data/nav'

export function titleTemplate(title?: string, base: string = TITLE, sep: '|' | '-' = '|'): string {
	return title ? `${title} ${sep} ${base}` : base
}

export function is<T>(t: T, v: any): boolean {
	return v == t
}

export function capitalize(str: string): string {
	return str
		.split(' ')
		.map((char) => `${char.at(0)?.toUpperCase() ?? ''}${char.slice(1)}`)
		.join(' ')
}
export function uppercase(str: string): string {
	return str
		.split('')
		.map((char) => char.toUpperCase())
		.join('')
}
