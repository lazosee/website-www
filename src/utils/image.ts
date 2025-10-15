import { getImage } from 'astro:assets'

export async function loadRemoteImage(src: string) {
	return await getImage({ src, quality: 100, fit: 'cover', format: 'avif' })
}
