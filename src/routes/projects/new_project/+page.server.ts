import type { Project } from '$lib/types/project.type';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
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
