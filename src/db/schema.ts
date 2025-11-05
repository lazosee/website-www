import { count, eq, isNull, sql } from 'drizzle-orm'
import {
	alias,
	boolean,
	integer,
	pgTable,
	pgView,
	text,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core'

/// 0. Schemas
// export const publicSchema = pgSchema('public')

/// 1. Tables
export const postsDataTable = pgTable('posts_data', {
	id: uuid('id').notNull().primaryKey().defaultRandom(),
	slug: text('slug').unique().notNull(),
	viewCount: integer('number_of_view').notNull().default(0),
})

export const usersDataTable = pgTable('users_data', {
	id: uuid('id').primaryKey().defaultRandom(),
	fullname: text('fullname').notNull(),
	email: text('email').unique().notNull(),
	pass: text('pass').notNull(),
	image: text('image_path').default(sql`NULL`),
})

export const commentsDataTable = pgTable('comments_data', {
	id: uuid('id').primaryKey().defaultRandom(),
	slug: text('slug')
		.notNull()
		.references(() => postsDataTable.slug, {
			onDelete: 'cascade',
		}),
	parentId: uuid('parent_id').default(sql`NULL`),
	userId: uuid('user_id')
		.notNull()
		.references(() => usersDataTable.id, {
			onDelete: 'cascade',
		}),
	body: text('body').notNull(),
	postedAt: timestamp('posted_at').notNull().defaultNow(),
})

export const likesDataTable = pgTable('likes_data', {
	id: uuid('id').primaryKey().defaultRandom(),
	parentId: uuid('parent_id'),
	userId: uuid('user_id')
		.notNull()
		.unique()
		.references(() => usersDataTable.id, {
			onDelete: 'cascade',
		}),
	isPositive: boolean('is_positive').notNull().default(true),
	postedAt: timestamp('posted_at').notNull().defaultNow(),
})

/// 2. Aliases
export const repliesDataTable = alias(commentsDataTable, 'reply')

/// 3. Views
export const topLevelCommentsView = pgView('top_level_comments').as((qb) => {
	return qb
		.select({
			id: commentsDataTable.id,
			slug: commentsDataTable.slug,
			userId: commentsDataTable.userId,
			username: usersDataTable.fullname,
			userImage: usersDataTable.image,
			body: commentsDataTable.body,
			likesCount: count(likesDataTable.id).as('likesCount'),
			repliesCount: count(repliesDataTable.id).as('repliesCount'),
			postedAt: commentsDataTable.postedAt,
		})
		.from(commentsDataTable)
		.innerJoin(usersDataTable, eq(commentsDataTable.userId, usersDataTable.id))
		.innerJoin(repliesDataTable, eq(commentsDataTable.id, repliesDataTable.parentId))
		.innerJoin(likesDataTable, eq(commentsDataTable.id, usersDataTable.id))
		.where(isNull(commentsDataTable.parentId))
		.groupBy(
			commentsDataTable.id,
			commentsDataTable.userId,
			usersDataTable.fullname,
			usersDataTable.image
			// commentsDataTable.slug,
			// commentsDataTable.body,
			// commentsDataTable.postedAt
		)
})

export const likesView = pgView('likes').as((qb) => {
	return qb
		.select({
			id: likesDataTable.id,
			userId: likesDataTable.userId,
			parentId: likesDataTable.parentId,
			time: likesDataTable.postedAt,
		})
		.from(likesDataTable)
		.where(eq(likesDataTable.isPositive, true))
})

export const dislikesView = pgView('dislikes').as((qb) => {
	return qb
		.select({
			id: likesDataTable.id,
			userId: likesDataTable.userId,
			parentId: likesDataTable.parentId,
			time: likesDataTable.postedAt,
		})
		.from(likesDataTable)
		.where(eq(likesDataTable.isPositive, false))
})

export const postsView = pgView('posts').as((qb) => {
	return qb
		.select({
			id: postsDataTable.id,
			slug: postsDataTable.slug,
			viewCount: postsDataTable.viewCount,
			likesCount: count(likesView.id).as('number_of_likes'),
			dislikesCount: count(dislikesView.id).as('number_of_dislikes'),
		})
		.from(postsDataTable)
		.innerJoin(likesView, eq(postsDataTable.id, likesView.parentId))
		.innerJoin(dislikesView, eq(postsDataTable.id, dislikesView.parentId))
		.groupBy(postsDataTable.id)
})
