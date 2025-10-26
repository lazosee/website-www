export async function copyToClipboard(content: string, target: HTMLElement) {
	await navigator.clipboard.writeText(content)
}
