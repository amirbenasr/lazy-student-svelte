import type { Project } from '$lib/types/project.type';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	create: async ({ request }) => {
		const { project_title, project_deadline, project_pages, project_tech, project_type } =
			Object.fromEntries(await request.formData()) as {
				project_title: string;
				project_deadline: string;
				project_page: string;
				project_tech: string;
				project_type: string;
				project_pages: string;
			};

		// const project: Project = {
		// 	deadline: new Date(project_deadline),
		// 	name:project_title,
		// 	description,

		// };

		return {
			success: true,
			submit: true
		};
	}
};
