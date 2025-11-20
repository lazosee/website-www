export async function getIpGeo(ipAddress: string) {
	const apiKey = '29b4c867fd79453dade94e7cda71aa30' // import.meta.env.IP_GEOLOCATION_API_KEY!

	const res = await fetch(
		`https://api.ipgeolocation.io/v2/ipgeo?apiKey=${apiKey}&ip=${ipAddress}`,
		{
			redirect: 'follow',
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:4321',
			},
		}
	)

	return await res.json()
}
