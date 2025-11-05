import { likesDataTable, postsDataTable } from '@/db/schema'
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { and, eq } from 'drizzle-orm'
import { db } from '../db'

export const postLike = defineAction({
	accept: 'json',
	input: z.object({
		positive: z.coerce.boolean({}),
		userId: z.string({}),
		parentId: z.string({}),
	}),
	async handler(input, { session }) {
		// Check if like already exists
		const existing = await db
			.select()
			.from(likesDataTable)
			.where(
				and(eq(likesDataTable.userId, input.userId), eq(likesDataTable.parentId, input.parentId))
			)
			.limit(1)

		if (!existing || existing.length === 0) {
			return await db
				.insert(likesDataTable)
				.values({
					userId: input.userId,
					isPositive: input.positive,
					parentId: input.parentId,
				})
				.returning()
		} else if (existing && existing.length > 0) {
			return await db
				.update(likesDataTable)
				.set({
					isPositive: input.positive,
				})
				.returning()
		} else {
			return null
		}
	},
})

export const postViews = defineAction({
	accept: 'json',
	input: z.object({
		slug: z.string({}),
	}),
	async handler({ slug }) {
		let data: {
			views: number
		}[]
		data = await db
			.select({ views: postsDataTable.viewCount })
			.from(postsDataTable)
			.where(eq(postsDataTable.slug, slug))

		if (!data || data.length === 0) {
			const d = await db
				.insert(postsDataTable)
				.values({
					slug: slug,
				})
				.returning()

			data = d
				.filter((a) => a.slug === slug)
				.map((i) => ({
					views: i.viewCount,
				}))
		}

		const { views } = data[0]

		return await db
			.update(postsDataTable)
			.set({
				viewCount: views + 1,
			})
			.returning()
	},
})
