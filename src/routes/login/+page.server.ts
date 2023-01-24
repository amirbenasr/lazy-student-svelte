import { type Cookies, type Actions, redirect, fail } from '@sveltejs/kit';
import type { User } from '$lib/types/user.type';
import { user } from '$lib/stores/userStore';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import type { ServerLoad } from '@sveltejs/kit/types/internal';

export const load: ServerLoad = async ({ cookies }) => {
	const token = cookies.get('lazy-token');
	if (token) throw redirect(303, '/');
	// throw redirect(300, '/');
};

export const actions: Actions = {
	default: async ({ cookies, locals, request }) => {
		const data = await request.formData();

		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email && !password) {
			return fail(400, { missingEmail: true, missingPassword: true });
		}
		if (!email) {
			return fail(400, { email, missingEmail: true });
		}
		if (!password) {
			return fail(400, { missingPassword: true });
		}

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
			return fail(400, { message: 'Verify your credentials' });
		}
	}
};
