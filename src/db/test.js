const CREATE_POSTS_DATA_TABLE = `--sql
    CREATE TABLE IF NOT EXISTS post_data (
        id SERIAL PRIMARY KEY NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        view_count INTEGER NOT NULL DEFAULT 0
    )
`
	.replaceAll('  ', '')
	.replaceAll('\n', ' ')

console.log(new Date())
