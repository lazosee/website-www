import { drizzle } from 'drizzle-orm/neon-http'
import { sql } from './neon'

export const db = drizzle({ client: sql })
