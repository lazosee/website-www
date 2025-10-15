export function format(date: Date, dateStyle: 'short' | 'full' | 'long' | 'medium' = 'medium') {
	return date.toLocaleDateString(undefined, {
		dateStyle,
	})
}
