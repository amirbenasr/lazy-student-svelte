import type { Actions, PageServerLoad } from '../$types';
import z from 'zod';
import { redirect } from '@sveltejs/kit';
export const load: PageServerLoad = async ({ fetch, url, locals }) => {
	const params = url.searchParams;
	if (locals.profile) {
		console.log('we have locals');

		// throw redirect(301, '/');
	}

	console.log(params);
};

const passwordSchema = z
	.object({
		new_password: z.string({ required_error: 'ZEZED' }).min(5).max(32),
		password: z.string({ required_error: 'Password must not be empty' }).min(5).max(32)
	})
	.superRefine(({ new_password, password }, ctx) => {
		if (new_password != password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password And Confirm Password should match',
				path: ['password_mismatch']
			});
		}
	});

export const actions: Actions = {
	forget: async ({ fetch, request }) => {
		const { new_password, password } = Object.fromEntries(await request.formData()) as {
			new_password: string;
			password: string;
		};
		let result;
		try {
			result = passwordSchema.parse({ new_password, password });
			console.log(result);
		} catch (error) {
			const { fieldErrors: errors } = error.flatten();

			return {
				errors,
				data: result
			};
		}

		throw redirect(300, '/');
	}
};
