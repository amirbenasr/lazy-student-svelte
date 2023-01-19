import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

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
