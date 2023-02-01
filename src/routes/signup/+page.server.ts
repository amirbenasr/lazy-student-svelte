import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { string } from 'zod/lib';

const signupSchema = z
	.object({
		email: z.string({ required_error: 'Email is required' }).email(),
		password: z.string({ required_error: 'Password' }).min(5).max(64),
		confirmpassword: z.string().min(5).max(64)
	})
	.superRefine(({ password, confirmpassword }, ctx) => {
		if (password != confirmpassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password And Confirm Password should match',
				path: ['confirmpassword']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password And Confirm Password should match',
				path: ['password']
			});
		}
	});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = Object.fromEntries(await request.formData());

		let validation;
		try {
			validation = signupSchema.parse(data);
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			const { password, confirmpassword, ...rest } = data;
			console.log(errors);

			return {
				data: rest,
				errors
			};
		}

		const { email, password } = validation;
		const res = await fetch('http://localhost:3000/users/create', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-type': 'application/json'
			}
		});
		console.log(await res.json());
	}
};
