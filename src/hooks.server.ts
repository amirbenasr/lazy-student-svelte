import { verifyToken } from '$lib/utils/others.server';
import type { Handle } from '@sveltejs/kit';
import { config } from '$lib/utils/config';
import { getUserAvatar } from '$lib/utils/utils';


export const handle: Handle = async ({ event, resolve }) => {
	console.log("here");
	
	event.setHeaders({
		credentials: 'include'
	});

	const token = event.cookies.get('lazy-token');

	if (!token) {
		return await resolve(event);
	}

	if (token && event.locals.profile) {
		return resolve(event);
	}

	if (verifyToken(token)) {
		console.log("token is verified");
		console.log(token);
		
		
		// console.log(process.env.);

		try {
			const response = await event.fetch(`http://localhost:3000/profile/`, {
				credentials: 'include'
			});
			const profile = await response.json();
			console.log("undefined?",profile);
			

			event.locals.profile = profile;
			// process userAvatar using local config
			event.locals.profile.avatar = getUserAvatar(profile);
		} catch (error) {
			console.log(error);
		}

		return await resolve(event);
	}

	return await resolve(event);
};
