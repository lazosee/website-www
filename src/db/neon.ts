import { neon } from '@netlify/neon'
const sql = neon() // automatically uses env NETLIFY_DATABASE_URL
const [post] = await sql`SELECT * FROM posts WHERE id = ${1}`

const seed = async () => {
	sql.transaction([sql``])

	// Create indices

	// Create posts data table
	const create = await sql`
        CREATE TABLE IF NOT EXISTS post_data (
            id SERIAL PRIMARY KEY NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            view_count INTEGER NOT NULL DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY NOT NULL,
            parent_id INTEGER NOT NULL,
            body TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY NOT NULL,
            fullname TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS likes (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL
        );
    `

	// Create comments table
	await sql``
}
