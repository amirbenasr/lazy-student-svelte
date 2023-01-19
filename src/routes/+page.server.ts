import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals, cookies }) => {
	const token = cookies.get('lazy-token');
	console.log(token);

	return {};
};
