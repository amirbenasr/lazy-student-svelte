import type { Project } from '$lib/types/project.type';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	create: async ({ request, fetch, locals }) => {
		const { project_title, project_deadline, project_pages, project_tech, project_type } =
			Object.fromEntries(await request.formData()) as {
				project_title: string;
				project_type: string;
				project_tech: string;
				project_pages: string;
				project_deadline: string;
			};

		const project: Project = {
			deadline: new Date(project_deadline),
			name: project_title,
			pages: Number.parseInt(project_pages),
			description: 'default description',
			technology: project_tech.toUpperCase(),
			type: project_type.toUpperCase()
		};

		// console.log(project);

		// const response = await fetch('http://localhost:3000/projects/create', {
		// 	method: 'POST',
		// 	body: JSON.stringify(project),
		// 	credentials: 'include',
		// 	headers: {
		// 		'Content-type': 'application/json'
		// 	}
		// });

		// console.log('server is called');

		return {
			success: true,
			submit: true,
			project
		};
	}
};
