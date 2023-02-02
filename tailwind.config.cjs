const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	plugins: [
		// Keep any existing plugins present and append the following:
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
		require('daisyui')
	],

	theme: {
		daisyui: {
			themes: [
				'light',
				'dark',
				'cupcake',
				'bumblebee',
				'emerald',
				'corporate',
				'synthwave',
				'retro',
				'cyberpunk',
				'valentine',
				'halloween',
				'garden',
				'forest',
				'aqua',
				'lofi',
				'pastel',
				'fantasy',
				'wireframe',
				'black',
				'luxury',
				'dracula',
				'cmyk',
				'autumn',
				'business',
				'acid',
				'lemonade',
				'night',
				'coffee',
				'winter'
			]
		},
		container: {
			center: true
		},
		extend: {}
	}
};

module.exports = config;
