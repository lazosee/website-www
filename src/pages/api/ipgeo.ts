import type { GeoData } from '@/types/ip-geo'
import { getIpGeo } from '@/utils/analytics'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
	const { ip } = await (
		await fetch('https://api.ipgeolocation.io/getip?apiKey=29b4c867fd79453dade94e7cda71aa30', {
			redirect: 'follow',
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:4321',
			},
		})
	).json()

	const { country_metadata, currency, location } = (await getIpGeo(ip as string)) as Omit<
		GeoData,
		'ip'
	>

	return Response.json({ country_metadata, location, currency })
}
