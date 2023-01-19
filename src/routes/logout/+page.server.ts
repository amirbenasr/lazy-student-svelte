import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ cookies }) => {
	throw redirect(302, '/');
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		console.log('deleting cookies');

		cookies.set('lazy-token', '', {
			path: '/',
			expires: new Date(0)
		});
	}
};
