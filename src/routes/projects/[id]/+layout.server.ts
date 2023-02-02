import type { LayoutServerLoad, PageServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch }) => {
	const id = params.id;

	const response = await fetch('http://localhost:3000/projects/' + id, {
		credentials: 'include'
	});

	const projectDetails = await response.json();
	return {
		id,
		projectDetails
	};
};
