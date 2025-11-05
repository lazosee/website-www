import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './localdb/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
	migrations: {
		schema: 'public',
	},
	verbose: true,
})
