import { type Cookies, type Actions, redirect, fail } from '@sveltejs/kit';
import type { User } from '$lib/types/user.type';
import { user } from '$lib/stores/userStore';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import type { ServerLoad } from '@sveltejs/kit/types/internal';
import { z } from 'zod';
import type { string, ZodError } from 'zod/lib';
import toast from 'svelte-french-toast';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string({ required_error: "Password can't be blank" }).min(5).max(64)
});

export const load: ServerLoad = async ({ cookies }) => {
	const token = cookies.get('lazy-token');
	if (token) throw redirect(303, '/');
};

export const actions: Actions = {
	reset: async ({}) => {
		// throw redirect(300, '/');
	},
	login: async ({ cookies, locals, request }) => {
		const data = await Object.fromEntries(await request.formData());
		let credentials;
		try {
			credentials = loginSchema.parse(data);

			console.log(credentials);
		} catch (error: any) {
			const { fieldErrors: errors } = error.flatten();
			const { password, ...rest } = data;
			console.log(errors);

			return {
				data: rest,
				errors: errors
			};
		}

		const { email, password } = credentials;
		const response = await fetch('http://localhost:3000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		const body = await response.json();
		console.log(body);

		if (body.success) {
			cookies.set('lazy-token', body.token);

			throw redirect(303, '/projects');
		} else {
			return {
				wrong_password: true
			};
		}
	}
};
