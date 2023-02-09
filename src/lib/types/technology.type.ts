export type technology = {
	image: string;
	name: string;
	description: string;
};

export const technologies: Array<technology> = [
	{
		description:
			'Flutter is an open-source UI software development kit created by Google. It is used to develop cross-platform applications for Android, iOS, Linux, macOS, Windows, Google Fuchsia, and the web from a single codebase.',
		image: '/images/flutter.png',
		name: 'Flutter'
	},
	{
		description:
			'React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.',
		image: '/images/react.png',
		name: 'React'
	},
	{
		description: 'Build a static website,using javascript/css/html.',
		image: '/images/html.png',
		name: 'HTML5/CSS/JS'
	},
	{
		description: 'Node.',
		image: '/images/nodejs.png',
		name: 'NODE JS'
	}
];
