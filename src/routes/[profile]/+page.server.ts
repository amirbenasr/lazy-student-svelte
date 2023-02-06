import {
	fromFormToProfile,
	fromProfileToFormData,
	fromProfileToJson,
	type Profile
} from '$lib/types/profile.type';
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
		publicProfile: profile,
		profile: locals.profile
	};
};

export const actions: Actions = {
	update: async ({ request, fetch }) => {
		console.log('test');

		// const profile: Profile =  fromFormToProfile(bject.fromEntries(await request.formData()));
		const data = Object.fromEntries(await request.formData());
		let form: FormData = new FormData();
		form.append('avatar', new Blob(['Hello World!\n']), 'test');
		form.append('fname', 'test');
		form.append('lname', 'hola');
		// form.append('avatar',data.get('image') as File);
		// const test = fromProfileToFormData(profile);
		const result = await fetch('http://localhost:3000/profile/', {
			method: 'PUT',
			credentials: 'include',
			body: form
		});
		console.log(await result.json());
	}
};
