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
		// const profile: Profile =  fromFormToProfile(bject.fromEntries(await request.formData()));
		const data = Object.fromEntries(await request.formData());
		// console.log(Object.fromEntries(await request.formData()));
		const fname = data['fname'];
		const lname = data['lname'];
		const bio = data['bio'];
		const file = data['file'] as File;

		let form: FormData = new FormData();
		// const imgData = file.split(',');
		if (file.size != 0) form.append('avatar', file, 'profile.png');
		form.append('fname', fname);
		form.append('lname', lname);
		form.append('bio', bio);
		// const test = fromProfileToFormData(profile);
		const result = await fetch('http://localhost:3000/profile/', {
			method: 'PUT',

			body: form
		});
		console.log(await result.json());
	}
};
