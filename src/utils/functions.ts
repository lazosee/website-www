import { TITLE } from '@/data/nav'

export type CategoryColor = 'arch' | 'art' | 'software' | 'personal'

export function get_category_colors(cc: CategoryColor): string {
	switch (cc) {
		case 'arch':
			return 'bg-arch-100 text-arch-800'
		case 'art':
			return 'bg-art-100 text-art-800'
		case 'software':
			return 'bg-software-100 text-software-800'
		case 'personal':
			return 'bg-personal-100 text-personal-800'
		default:
			return 'bg-sky-100 text-sky-800'
	}
}

export function get_color_hex(cc: CategoryColor) {
	switch (cc) {
		case 'software':
			return '1d293d'
		case 'art':
		case 'personal':
			return 'a50036'
		case 'arch':
		default:
			return '00598a'
	}
}

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
