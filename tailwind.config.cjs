const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	plugins: [
		// Keep any existing plugins present and append the following:
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	],

	theme: {
		container: {
			center: true
		},
		extend: {}
	}
};

module.exports = config;
