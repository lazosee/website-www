import { client } from '@/db/mongodb'
import type { GeoData } from '@/types/ip-geo'
import type { Visit } from '@/types/mongodb'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const visitLog = defineAction({
	accept: 'json',
	input: z.object({
		page: z.string().optional().default('unknown'),
		visit_time: z.coerce.date().optional().default(new Date()),
		ip_geo_url: z.string(),
	}),
	async handler({ page, visit_time, ip_geo_url }, context) {
		try {
			if (!client) {
				throw new Error('Failed to connect to DB!', {
					cause: 'INTERNAL_SERVER_ERROR',
				})
			}

			await client.connect()
			const mongodb = client.db('page-visit')
			const collection = mongodb.collection<Visit>('visit')

			const res = await fetch(ip_geo_url)
			const geo = (await res.json()) as Omit<GeoData, 'ip'>

			const visitRecord = {
				page,
				geo: geo,
				visit_time,
				log_time: new Date(),
				user_agent: context.request.headers.get('user-agent') ?? 'unknown',
			}

			// Save the visit to mongodb
			const { acknowledged, insertedId } = await collection.insertOne(visitRecord)

			if (!acknowledged) {
				throw new Error('Could not inser page visit into the DB!', {
					cause: 'EXPECTATION_FAILED',
				})
			}

			console.log({ acknowledged, insertedId })

			return {
				message: 'Success!',
				insertedId: insertedId.toString(),
			}
		} catch (e) {
			console.error(e)
			throw e
		} finally {
			await client.close()
		}
	},
})
