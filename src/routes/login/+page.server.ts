import { type Cookies, type Actions, redirect, fail } from '@sveltejs/kit';
import type { User } from '$lib/types/user.type';
import { user } from '$lib/stores/userStore';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

export const load = async () => {
	console.log('when this is called ?');

	if (browser) {
		alert('test');
	}
};

export const actions: Actions = {
	default: async ({ cookies, locals, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email) {
			return fail(400, { email, missing: true });
		}
		if (!password) {
			return fail(400, { empty: true });
		}
		const response = await fetch('http://localhost:3000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		const body = await response.json();

		if (body.success) {
			cookies.set('lazy-token', body.token);

			let userData: User = {
				id: '1',
				email: 'amirbennasr@gmail.com'
			};
			user.login(userData);
			throw redirect(303, '/projects');
		} else {
			return fail(400);
		}
	}
};
