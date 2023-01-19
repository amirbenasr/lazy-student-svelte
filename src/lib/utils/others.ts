import { sign, verify as V } from 'jsonwebtoken';

export const verifyToken = (token: string): Boolean => {
	console.log('running this?');

	let verified;

	try {
		verified = V(token, 'secret-lounge');
		return true;
	} catch (error) {
		return false;
	}
};
