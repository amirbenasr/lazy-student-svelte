export type Profile = {
	fname: string;
	lname: string;
	bio?: string;
	dob: Date;
};

export function fromProfileToJson(profile: Profile) {
	return JSON.stringify(profile);
}
export function fromProfileToFormData(profile: Profile) {
	var formData = new FormData();
	formData.append('fname', '');
	formData.append('lname', '');
	formData.append('bio', '');
	// formData.append('avatar',File.)
	// formData.append('test', 'test');
	console.log(Object.keys(profile));

	// return formData;
}

export const fromFormToProfile = (x: any) => {
	const data = JSON.stringify(x);
	const profile: Profile = JSON.parse(data) as Profile;
	return profile;
};
