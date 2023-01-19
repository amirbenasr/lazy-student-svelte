export type Profile = {
	fname: string;
	lname: string;
	bio?: string;
	dob: Date;
};

export function fromProfileToJson(profile: Profile) {
	return JSON.stringify(profile);
}

export const fromFormToProfile = (x: any) => {
	const data = JSON.stringify(x);
	const profile: Profile = JSON.parse(data) as Profile;
	return profile;
};
