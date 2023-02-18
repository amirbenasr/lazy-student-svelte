import { env } from '$env/dynamic/public';
import { HASHED_SECRET } from '$env/static/private';

import { sign, verify as V } from 'jsonwebtoken';

export const verifyToken = (token: string): Boolean => {
	console.log('running this?');
	console.log(HASHED_SECRET);

	let verified;

	try {
		verified = V(token, HASHED_SECRET);
		return true;
	} catch (error) {
		return false;
	}
};
