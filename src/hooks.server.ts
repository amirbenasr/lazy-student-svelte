import { verifyToken } from '$lib/utils/others';
import type { Handle } from '@sveltejs/kit';
import { createLogger } from 'vite';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('lazy-token');
	if (!token) {
		return await resolve(event);
	}

	if (token && event.locals.profile) {
		return resolve(event);
	}

	if (verifyToken(token)) {
		// console.log(process.env.);

		const response = await event.fetch(`http://172.19.0.3:3000/profile/`, {
			credentials: 'include'
		});
		const profile = await response.json();

		event.locals.profile = profile;
		console.log(event.locals.profile);

		return await resolve(event);
	}

	return await resolve(event);
};
