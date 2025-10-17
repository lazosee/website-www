import { category_bg } from '@/utils/colors'
import { desc, eq } from 'drizzle-orm'
import { db } from '.'
import { categoriesTable, postsTable } from './schema'

/// 1. FEATURED POSTS W/ CATEGORY
export async function getFeaturedPosts(limit = 4) {
	return (
		await db
			.select({
				title: postsTable.title,
				slug: postsTable.slug,
				category: {
					title: categoriesTable.title,
					slug: categoriesTable.slug,
				},
				image: postsTable.thumbnailUrl,
				createdAt: postsTable.createdAt,
				readingTime: postsTable.readingTime,
				snippet: postsTable.snippet,
			})
			.from(postsTable)
			.orderBy(desc(postsTable.createdAt))
			.limit(limit)
			.innerJoin(categoriesTable, eq(postsTable.categoryId, categoriesTable.id))
	).map((d) => ({
		...d,
		category: {
			...d.category,
			bg: category_bg(d.category.slug),
		},
	}))
}

/// 2. ALL POSTS W/ CATEGORY
export async function getAllPosts() {
	return (
		await db
			.select({
				title: postsTable.title,
				slug: postsTable.slug,
				category: {
					title: categoriesTable.title,
					slug: categoriesTable.slug,
				},
				image: postsTable.thumbnailUrl,
				createdAt: postsTable.createdAt,
				readingTime: postsTable.readingTime,
				snippet: postsTable.snippet,
			})
			.from(postsTable)
			.orderBy(desc(postsTable.createdAt))
			.innerJoin(categoriesTable, eq(postsTable.categoryId, categoriesTable.id))
	).map((d) => ({
		...d,
		category: {
			...d.category,
			bg: category_bg(d.category.slug),
		},
	}))
}

/// 3. FILTER POSTS BY CATEGORY
export async function getPostsByCategory(category: string) {
	return (await getAllPosts()).filter((c) => c.category.slug == category)
}

/// 4. GET ALL CATEGORIES
export async function getAllCategories() {
	return await db.select().from(categoriesTable)
}
