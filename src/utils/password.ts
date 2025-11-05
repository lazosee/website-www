import { compareSync, genSaltSync, hashSync } from 'bcrypt'

export const salt = genSaltSync(20)

export const hashPassword = (password: string) => {
	return hashSync(password, salt)
}

export const matchPassword = (password: string, encrypted: string) => {
	return compareSync(password, encrypted)
}
