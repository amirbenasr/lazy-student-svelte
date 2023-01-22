import type { Project } from '$lib/types/project.type';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals, fetch }) => {
	const user = locals.profile;

	if (!user) {
		throw redirect(301, '/');
	}

	const response: Response = await fetch('http://172.19.0.3:3000/projects/', {
		credentials: 'include'
	});

	if (response.status != 200) {
		throw error(401, 'Server error');
	}

	const projects: Project[] = await response.json();

	return {
		projects
	};
};
