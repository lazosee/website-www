// --- UTILITY FUNCTIONS ---

import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { categoriesTable, postsTable, type NewCategory, type NewPost } from './schema'

/**
 * Generates a URL-friendly slug from a string.
 * e.g., "My Great Post Title" -> "my-great-post-title"
 */
function createSlug(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with a single hyphen
}

/**
 * Gets a random element from an array.
 */
function getRandomElement<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Generates a string of sample Markdown content and extracts a snippet.
 * @returns {object} { body: string, snippet: string }
 */
function generateMarkdownAndSnippet(title: string): { body: string; snippet: string } {
	const body = `
# ${title}

This is the introductory paragraph for the post "${title}". It serves as a brief overview of the content you're about to read. This is a second sentence for variety.

---

## The Core Concept

In this section, we dive deep into the main topic. Markdown is great for documentation and technical writing.

\`\`\`typescript
const example = 'This is a code block inside markdown.';
function hello() {
  console.log(example);
}
\`\`\`

### A Nested Subheading

- Bullet points are easy.
- **Bold text** is supported.
- *Italic text* is supported.

> This is a quote, perhaps from a famous figure or source.

[Check out the link to the Drizzle documentation!](https://orm.drizzle.team/)

The post concludes here. Thanks for reading!
`.trim()

	// Extract the snippet: Remove the title, then take the first two sentences (or 150 characters max).
	const contentWithoutTitle = body.split('\n\n').slice(1).join('\n\n').trim()
	const snippet = contentWithoutTitle.substring(0, 150).split('.').slice(0, 2).join('. ') + '...'

	return { body, snippet: snippet.trim() }
}

// --- SEED DATA ---
const CATEGORY_TITLES = ['Architecture', 'Code', 'Personal', 'Writing']
const POST_TITLES = [
	'Mastering Connection Pooling with PgBouncer',
	'Drizzle ORM: A Deep Dive into Schema Migrations',
	'My Journey into Frontend Development',
	'Why Markdown is the Best Format for Content',
	'Advanced TypeScript Generics for Dummies',
	'Lessons Learned from My First Open Source Contribution',
	'A Critique of Modern Web Frameworks',
	'Essential CSS Tricks for HTML5 Game Development',
	'How to Structure a Large Monorepo Project',
	'10 Tips for Writing More Engaging Blog Posts',
]

/**
 * Seeds the categories table with fixed titles.
 */
export async function seedCategories(db: NodePgDatabase) {
	const newCategories: NewCategory[] = CATEGORY_TITLES.map((title) => ({
		title,
		slug: createSlug(title),
	}))

	console.log('Seeding categories...')
	// Inserts the new categories and returns the created objects (including their generated IDs)
	const insertedCategories = await db.insert(categoriesTable).values(newCategories).returning()

	console.log(`✅ Inserted ${insertedCategories.length} categories.`)
	return insertedCategories
}

/**
 * Seeds the posts table with sample data, including the new 'snippet' column.
 */
export async function seedPosts(db: NodePgDatabase, categories: NewCategory[]) {
	if (categories.length === 0) {
		console.error('Cannot seed posts: No categories found.')
		return
	}

	const postsToInsert: NewPost[] = POST_TITLES.slice(0, 10).map((title, index) => {
		// Randomly select a category ID
		const category = getRandomElement(categories)

		// Generate content and metadata
		const slug = createSlug(title)
		const { body, snippet } = generateMarkdownAndSnippet(title) // Use the new function
		const tags = [category.title.toLowerCase(), slug.split('-')[0]]

		// Sample logic for generating reading time based on content length
		const readingTime = Math.max(1, Math.ceil(body.length / 1000) + 1)

		return {
			title,
			slug,
			body,
			snippet, // ⬅️ NEW: Snippet is now included
			categoryId: category.id!,
			thumbnailUrl: `https://picsum.photos/seed/${index}/1200/600`,
			readingTime,
			tags,
		}
	})

	console.log('Seeding posts...')
	const insertedPosts = await db.insert(postsTable).values(postsToInsert).returning()

	console.log(`✅ Inserted ${insertedPosts.length} posts.`)
	return insertedPosts
}
