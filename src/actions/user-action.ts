import { db } from '@/db'
import { usersDataTable } from '@/db/schema'
import { capitalize } from '@/utils'
import { defineAction } from 'astro:actions'
import { z } from 'astro:content'
import { hashSync } from 'bcrypt'

export const userSignup = defineAction({
	accept: 'json',
	input: z.object({
		firstname: z.string({}),
		lastname: z.string({}),
		email: z.string({}).email({}),
		password: z.string({}),
	}),
	async handler({ firstname, lastname, email, password }, { session }) {
		if (
			firstname.trim() == '' ||
			lastname.trim() == '' ||
			email.trim() == '' ||
			password.trim() == ''
		) {
			return {
				success: false,
				userId: null,
				message: 'Must provide valid user data fields',
			}
		}
		const fullname = `${capitalize(firstname.trim())} ${capitalize(lastname.trim())}`

		try {
			const pass = hashSync(password, 10)

			const [user] = await db
				.insert(usersDataTable)
				.values({
					fullname,
					email,
					pass,
				})
				.returning()

			if (user) {
				session?.set('userId', user.id)

				return {
					success: true,
					userId: user.id,
					message: 'User created successfully!',
				}
			}
		} catch (error) {
			return {
				success: false,
				userId: null,
				message: JSON.stringify(error, null, 2),
			}
		}
	},
})
