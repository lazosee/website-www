export type SortBy = 'oldest' | 'latest' | 'popular'

export function sortAndReplaceElements(
	parentId: string,
	childrenToSortClass: string,
	sortBy: SortBy
) {
	// 1. Select the parent and the elements
	const parentContainer = document.getElementById(parentId) as HTMLElement
	// Ensure the selector targets the children properly (e.g., '.child-class')
	const elementCollection = parentContainer.querySelectorAll(
		childrenToSortClass
	) as NodeListOf<HTMLElement>

	// 2. Convert to Array and Sort
	const elementsArray = Array.from(elementCollection)

	// Define the custom sort logic
	elementsArray.sort((a, b) => {
		let valA: number
		let valB: number

		switch (sortBy) {
			case 'latest':
			case 'oldest':
				// Use 'date' data attribute for both date sorts
				// Use 0 as a default if the attribute is missing, so parseInt doesn't fail.
				valA = parseInt(a.dataset.date ?? '0', 10)
				valB = parseInt(b.dataset.date ?? '0', 10)

				// For 'latest' (largest date value first), use DESCENDING (b - a)
				if (sortBy === 'latest') {
					return valB - valA // Newest first
				}

				// For 'oldest' (smallest date value first), use ASCENDING (a - b)
				return valA - valB // Oldest first (default case)

			case 'popular':
				// Use 'views' data attribute for popularity
				valA = parseInt(a.dataset.views ?? '0', 10)
				valB = parseInt(b.dataset.views ?? '0', 10)

				// For 'popular' (largest views value first), use DESCENDING (b - a)
				return valB - valA // Most popular first

			default:
				return 0 // No sorting
		}
	})

	// 3. Efficiently Replace the elements using a DocumentFragment
	const fragment = document.createDocumentFragment()

	// Append sorted elements to the fragment (removes them from parent)
	elementsArray.forEach((element) => {
		fragment.appendChild(element)
	})

	// Append the fragment to the parent (re-inserts them in sorted order)
	parentContainer.appendChild(fragment)

	// You can remove the console.clear() and console.log(parentContainer) for production
	console.log(`Elements sorted by ${sortBy} and replaced.`)
	console.log(parentContainer)
}
