import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const categoriesTable = pgTable('categories_table', {
	id: uuid('id').unique('unique_post_category_id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	slug: text('slug').unique('unique_post_category_slug').notNull(),
})

export const postsTable = pgTable('posts_table', {
	id: uuid('id').unique('unique_post_id').primaryKey().defaultRandom(),
	title: text('title').notNull(),
	snippet: text('snippet').notNull().default(''),
	body: text('body').notNull(),
	slug: text('slug').unique('unique_post_slug').notNull(),
	categoryId: uuid('category_id')
		.notNull()
		.references(() => categoriesTable.id, { onDelete: 'cascade' }),
	thumbnailUrl: text('thumbnail_url').notNull(),
	readingTime: integer('reading_time').notNull().default(1),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date()),
	tags: text('tags').array().notNull().default([]),
	postViews: integer('post_views').notNull().default(0),
	postLikes: integer('post_likes').notNull().default(0),
})

export type NewCategory = InferInsertModel<typeof categoriesTable>
export type Category = InferSelectModel<typeof categoriesTable>

export type NewPost = InferInsertModel<typeof postsTable>
export type Post = InferSelectModel<typeof postsTable>
