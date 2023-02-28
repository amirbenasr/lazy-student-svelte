import type { Project } from '$lib/types/project.type';
import type { Actions } from '@sveltejs/kit';
import z from 'zod';
const projectSchema = z.object({
	title:z.string({required_error:"Title must have at least 5 characters"}).min(5).max(20),
	description: z
		.string({ required_error: 'Project description must have at least 10 characters.' })
		.min(10)
		.max(80),
	type: z.string({ required_error: 'No category selected' }).min(1),
	technology: z.string({ required_error: 'No technology selected' }).min(1)
});

export const actions: Actions = {
	create: async ({ request, fetch, locals }) => {
		const { title,description, deadline, pages, technology, type,budget } = Object.fromEntries(
			await request.formData()
		) as {
			title:string,
			description: string;
			type: string;
			technology: string;
			pages: string;
			deadline: string;
			budget:string
		};

		const project: Project = {
			deadline: new Date(deadline),
			title:title,
			pages: Number.parseInt(pages),
			description,
			technology: technology?.toUpperCase(),
			type: type?.toUpperCase(),
			budget:Number.parseInt(budget)
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
		return {
			project
		};
	}
};
