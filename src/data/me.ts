import { SocialIcons } from '@/icons/social'
import type { HTMLAttributes } from 'astro/types'

export const about: About = {
	name: 'lazaro osee',
	image: 'https://picsum.photos/seed/1/1200/600',
	hobbies: ['drawing', 'painting', 'programming', 'designing', 'modelling'],
	desc: 'An architecture student with a passion for <code class="text-slate-800 dark:text-slate-200 uppercase">research</code>,<code class="text-slate-800 dark:text-slate-200 uppercase">creation</code>, and <code class="text-slate-800 dark:text-slate-200 uppercase">sharing</code> of ideas and projects',
	description:
		'An architecture student with a passion for Research, Creation, and Sharing of Ideas and Projects',
	socials: [
		{ label: 'Github', href: 'https://github.com/lazosee', icon: SocialIcons['github'] },
		{ label: 'Linkedin', href: 'https://www.linkedin.com/in/lazaro-osee/', icon: '' },
		{ label: 'Bluesky', href: 'https://bsky.app/profile/lazaroosee.xyz', icon: '' },
		{ label: 'X (Twitter)', href: 'https://x.com/thedevequation', icon: '' },
	],
}

export type Social = {
	href: string
	label: string
	icon: string | ((args: HTMLAttributes<'svg'>) => string)
}

export type About = {
	name: string
	image: string
	hobbies: string[]
	desc: string
	description: string
	socials: Social[]
}
