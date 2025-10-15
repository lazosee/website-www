import type { Category } from '@/db/schema'

// Category #	Tailwind Color	Hex Code (Approx.)	Example Use Case
// 1	indigo-500	#6366f1	Technology
// 2	red-500	#ef4444	Breaking News
// 3	emerald-500	#10b981	Health & Wellness
// 4	amber-500	#f59e0b	Finance/Money
// 5	sky-500	#0ea5e9	Travel
// 6	purple-500	#a855f7	Entertainment
// 7	rose-500	#f43f5e	Lifestyle
// 8	teal-500	#14b8a6	Education

export function category_bg(cat: Category['slug'], tailwindPrefix = 'bg') {
	const p = (s: string) => `${tailwindPrefix}-${s}`
	switch (cat) {
		case 'architecture':
		case 'code':
			return p('indigo-500')
		case 'personal':
			return p('rose-500')
		case 'writing':
		default:
			return p('teal-500')
	}
}
