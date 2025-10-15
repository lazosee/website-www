import type { Link } from '@/types/shared'
import { Fragment, useState, type FC, type PropsWithChildren } from 'react'
import './header.css'

export const Navbar: FC<PropsWithChildren<{ links: Link[] }>> = ({ links }) => {
	const [isDropOpen, setDropOpen] = useState<boolean>(false)

	const toggleDropdown = () => setDropOpen((prev) => !prev)

	return (
		<nav className="relative w-auto ml-auto p-0 flex flex-col items-center justify-center">
			<button
				onClick={toggleDropdown}
				className={[
					'anchor relative w-fit border-l-2 p-4 hover:bg-slate-400 focus-visible:bg-slate-400 dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800 md:hidden',
					isDropOpen && 'bg-slate-400 dark:bg-slate-800',
				].join(' ')}
			>
				<svg
					width="1.4rem"
					height="1.4rem"
					viewBox="0 0 32 32"
					fill="none"
					stroke="currentColor"
					strokeWidth={4}
					strokeLinecap="round"
					strokeLinejoin="round"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M2, 2L30, 2" />
					<path d="M2, 15L25, 15" />
					<path d="M2, 28L20, 28" />
				</svg>
			</button>
			<ul
				className={[
					isDropOpen
						? 'target z-50 flex top-0 right-0 w-60 bg-slate-400 dark:bg-slate-900 border-2 border-r-0'
						: 'hidden ',
					'm-0 p-0 md:w-full fixed md:relative md:flex flex-col md:flex-row justify-between border-collapse',
				].join(' ')}
			>
				{links.map((link, idx) => (
					<Fragment key={`frag-${idx.toString()}`}>
						<span
							key={`sep-${idx.toString()}`}
							className="h-[inherit] w-3 m-0 p-0 z-10 bg-current"
						></span>
						<li
							key={idx.toString()}
							className="nav-li flex items-center justify-center w-full h-full m-0 p-0 not-last:border-b-2 md:border-none hover:bg-slate-300 focus-visible:bg-slate-300 dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800"
						>
							<a
								href={link.href}
								className="flex items-center justify-start md:justify-center w-full h-full p-4 hover:bg-slate-300 focus-visible:bg-slate-300 dark:hover:bg-slate-800 dark:focus-visible:bg-slate-800"
							>
								{link.label}
							</a>
						</li>
					</Fragment>
				))}
			</ul>
		</nav>
	)
}
