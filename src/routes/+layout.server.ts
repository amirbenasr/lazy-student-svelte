import type { Actions, LayoutServerLoad } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		console.log('logging out');

		cookies.set('lazy-token', '');
	}
};

export const load: LayoutServerLoad = async ({ request, locals, cookies }) => {
	const profile = locals.profile;

	return { profile };
};
