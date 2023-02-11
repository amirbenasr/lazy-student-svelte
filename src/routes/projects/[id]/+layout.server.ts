import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad, PageServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch, locals }) => {
	const projectId = params.id;
	const userId = locals.profile.userId;
	console.log('logging from layout' + projectId);

	const response = await fetch('http://localhost:3000/projects/' + projectId, {
		credentials: 'include'
	});

	const projectDetails = await response.json();
	if (projectDetails.creatorId != userId) throw redirect(301, '/projects');
	return {
		projectId,
		projectDetails
	};
};
