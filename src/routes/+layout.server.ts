import type { Actions, LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, locals, cookies }) => {
	const profile = locals.profile;

	return { profile };
};
