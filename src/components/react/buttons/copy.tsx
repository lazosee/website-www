import { copyToClipboard } from '@/utils/navigator'
import { useEffect, useState, type PropsWithChildren } from 'react'

const copy_svg = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Z"/></svg>
`

export default function Copy({ content }: PropsWithChildren<{ content: string }>) {
	const [copied, setCopied] = useState<boolean>(false)
	async function handleCopy(this: HTMLElement) {
		copyToClipboard(content, this)
		setCopied(true)
	}

	useEffect(() => {
		if (copied) {
			setTimeout(() => setCopied((p) => !p), 4000)
		}
	}, [copied])

	return (
		<button onClick={handleCopy} className="cursor-pointer">
			{copied ? (
				<>
					<span className="">copied!</span>
				</>
			) : (
				<div dangerouslySetInnerHTML={{ __html: copy_svg }}></div>
			)}
		</button>
	)
}
