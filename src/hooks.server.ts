import { verifyToken } from '$lib/utils/others';
import type { Handle } from '@sveltejs/kit';
import { createLogger } from 'vite';
import { config } from '$lib/utils/config';

const getUserAvatar = (profile: any): string => {
	if (profile.avatar === 'monkey') {
		return config['media-url'] + 'default/' + 'monkey.jpg';
	}
	return config['media-url'] + profile.user.username + '/profile.jpg';
};
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

		try {
			const response = await event.fetch(`http://localhost:3000/profile/`, {
				credentials: 'include'
			});
			const profile = await response.json();

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
