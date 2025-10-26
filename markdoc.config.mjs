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
		list: {
			attributes: nodes.list.attributes,
			render: component('src/components/tags', 'List'),
		},
		item: {
			attributes: nodes.item.attributes,
			render: component('src/components/tags', 'Item'),
		},
		blockquote: {
			attributes: nodes.blockquote.attributes,
			render: component('src/components/tags', 'Blockquote'),
		},
	},
})
