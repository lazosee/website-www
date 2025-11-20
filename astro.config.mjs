// @ts-check
import { defineConfig } from 'astro/config'

import markdoc from '@astrojs/markdoc'
import netlify from '@astrojs/netlify'
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react'

import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    site: 'http://localhost:4321', //'https://www.lazaroosee.xyz',
    adapter: netlify({
        edgeMiddleware: true,
        imageCDN: true,
        devFeatures: {
            environmentVariables: true,
            images: true,
        },
    }),
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [markdoc({}), react(), mdx({ optimize: true }), sitemap({
        changefreq: 'weekly',
        priority: 0.7,
        entryLimit: 10_000,
        filter: (page) => !page.includes('/admin'),
        serialize: (item) => {
            if (/admin/.test(item.url)) {
                return undefined
            }
            return item
        },
		}), svelte()],
    image: {
        remotePatterns: [
            { protocol: 'https', hostname: 'picsum.photos' },
            { protocol: 'https', hostname: 'placehold.co' },
        ],
    },
})