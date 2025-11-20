import { client } from '@/db/mongodb'
import { type HandlerContext, type HandlerEvent } from '@netlify/functions'

export async function handler(event: HandlerEvent, context: HandlerContext) {
	// Only allow post requests
	if (event.httpMethod.toUpperCase() !== 'POST') {
		return {
			statusCode: 405,
			body: 'Method Not Allowed',
		}
	}

	try {
		if (!client) {
			return {
				statusCode: 500,
				body: 'Failed to connect to DB!',
			}
		}

		const db = client.db('page-visits')
		const collection = db.collection('visits')
		const reqBody = JSON.parse(event.body || '{}')

		const visitRecord = {
			page: reqBody.page || 'unknown',
			visit_time: reqBody.visit_time || new Date().toISOString(),
			log_time: new Date().toISOString(),
			user_agent: event.headers['user-agent'] || 'unknown',
		}

		await collection.insertOne(visitRecord)

		return {
			statusCode: 200,
			body: 'Visit logged successfully',
		}
	} catch (error) {
		return {
			statusCode: 500,
			body:
				'Something went wrong \n' +
				(error instanceof Error ? `: ${error.message}` : JSON.stringify(error)),
		}
	} finally {
		await client.close()
	}
}
