import { fromFormToProfile, fromProfileToJson, type Profile } from '$lib/types/profile.type';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals, params }) => {
	const userparam = params.profile;

	const result: Response = await fetch(`http://localhost:3000/profile/public/${userparam}`);
	console.log(result.status);

	if (result.status != 201) {
		throw error(404, 'user not found');
	}
	const profile: Profile = fromFormToProfile(await result.json());

	return {
		publicProfile: profile
	};
};

export const actions: Actions = {
	update: async ({ request, fetch }) => {
		const profile: Profile = fromFormToProfile(Object.fromEntries(await request.formData()));
		const result = await fetch('http://localhost:3000/profile/', {
			method: 'PUT',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: fromProfileToJson(profile)
		});
		console.log(await result.json());
	}
};
