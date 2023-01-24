import type { Project } from '$lib/types/project.type';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		console.log(data);

		const deadline = data.get('deadline');
		const projecttype = data.get('project-type');
		console.log(projecttype);

		// const type
		// const project :Project = {

		// }

		return {
			success: true,
			submit: true
		};
	}
};
