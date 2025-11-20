import { commentsDataTable } from '@/db/schema'
import { defineAction } from 'astro:actions'
import { z } from 'astro:content'
import { db } from '../db'

export const comment = defineAction({
	accept: 'json',
	input: z.object({
		comment: z.string({}),
		slug: z.string({}),
	}),
	async handler(input, context) {
		const userId = await context.session?.get('userId')
		if (!userId) {
			return {
				success: true,
				message: 'Must be logged in to comment',
			}
		}

		const { comment, slug } = input

		try {
			const [res] = await db
				.insert(commentsDataTable)
				.values({
					body: comment.trim(),
					slug: slug.trim(),
					userId: userId,
				})
				.returning()

			if (res) {
				return {
					message: 'Comment successful',
					success: true,
				}
			}
		} catch (error) {
			return {
				message: 'Comment not successful \n' + JSON.stringify(error, null, 2),
				success: true,
			}
		}
	},
})
