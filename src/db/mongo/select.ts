import type { Visit } from '@/types/mongodb'
import type { WithId } from 'mongodb'
import { client } from '../mongodb'

const mongodb = client.db('page-visit')
const collection = mongodb.collection<Visit>('visit')

export async function getVisits(): Promise<WithId<Visit>[]> {
	const visits: WithId<Visit>[] = []

	try {
		if (!client) {
			throw new Error('Could not initialize mongodb client')
		}
		await client.connect()
		const findVisits = collection.find({
			log_time: {
				$gte: new Date(new Date().getTime() - 60 * 60 * 1000 * 24 * 365),
			},
		})
		for await (const doc of findVisits) {
			visits.push(doc)
		}
	} catch (error) {
		console.error(error)
		throw error
	} finally {
		await client.close()
		return visits
	}
}

export function processVisits(visits: WithId<Visit>[]) {
	return visits.map((v /**: WithId<Visit>*/) => ({
		_id: v._id.toHexString(),
		continent: v.geo.location.continent_name,
		country: v.geo.location.country_name,
		flag: v.geo.location.country_flag,
		page: v.page,
		date: v.visit_time,
		user_agent: v.user_agent,
	}))
}
