import { component, defineMarkdocConfig, nodes } from '@astrojs/markdoc/config'


export default defineMarkdocConfig({
	variables: {
		// environment: process.env.IS_PROD ? 'prod' : 'dev',
	},
	nodes: {
		document: {
			render: component('src/components/tags', 'Document'),
		},
		fence: {
			render: component('src/components/tags', 'Fence'),
			attributes: {
				content: {
					type: 'String',
				},
				language: {
					type: 'String',
				},
			},
		},
		code: {
			...nodes.code,
			render: component('src/components/tags', 'Code'),
		},
		blockquote: {
			attributes: nodes.blockquote.attributes,
			render: component('src/components/tags', 'Blockquote'),
		},
	},
})
