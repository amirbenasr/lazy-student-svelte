import type { Project } from '$lib/types/project.type';
import { redirect, type Actions } from '@sveltejs/kit';
import z from 'zod';
const projectSchema = z.object({
	name: z
		.string({ required_error: 'Project title must have at least 10 characters.' })
		.min(10)
		.max(80),
	type: z.string({ required_error: 'No category selected' }).min(1),
	technology: z.string({ required_error: 'No technology selected' }).min(1)
});

export const actions: Actions = {
	create: async ({ request, fetch, locals }) => {
		const { name, deadline, pages, technology, type } = Object.fromEntries(
			await request.formData()
		) as {
			name: string;
			type: string;
			technology: string;
			pages: string;
			deadline: string;
		};

		const project: Project = {
			deadline: new Date(deadline),
			name: name,
			pages: Number.parseInt(pages),
			description: 'default description',
			technology: technology?.toUpperCase(),
			type: type?.toUpperCase()
		};

		try {
			const validateSchema = projectSchema.parse(project);
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			console.log(errors);
			console.log(project);

			return {
				project,
				errors
			};
		}

		const response = await fetch('http://localhost:3000/projects/create', {
			method: 'POST',
			body: JSON.stringify(project),
			credentials: 'include',
			headers: {
				'Content-type': 'application/json'
			}
		});

		const body = await response.json();

		if (body.success) {
			throw redirect(301, '/projects');
		}
	}
};
