const config = {
	plugins: [require('daisyui')],

	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		container: {
			center: true
		},
		extend: {}
	}
};

module.exports = config;
