import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const id = params.id;

	const response = await fetch('http://localhost:3000/projects/' + id, {
		credentials: 'include'
	});

	const projectDetails = await response.json();
	console.log(projectDetails);

	return {
		id,
		projectDetails
	};
};
