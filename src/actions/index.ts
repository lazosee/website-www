import { comment } from './comment-action'
import { postLike, postViews } from './post-data'
import { userSignup } from './user-action'

export const server = {
	postLike,
	postViews,
	userSignup,
	comment,
}
