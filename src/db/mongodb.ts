import { MongoClient, ServerApiVersion } from 'mongodb'

const { MONGODB_CONNECTION_STRING } = import.meta.env

export const client = new MongoClient(MONGODB_CONNECTION_STRING!, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
	connectTimeoutMS: 100000,
})
