// @ts-check
import { defineConfig } from 'astro/config'

import markdoc from '@astrojs/markdoc'
import netlify from '@astrojs/netlify'
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: netlify({
		edgeMiddleware: true,
	}),
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [markdoc({}), react(), mdx({ optimize: true })],
	image: {
		remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
	},
})
