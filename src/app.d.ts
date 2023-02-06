// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		profile: {
			id;
			fname;
			lname;
			dob;
			country;
			bio;
			avatar;
			userId;
			createdAt;
			user: {
				username;
			};
		};
	}
	// interface PageData {}
	// interface Platform {}
}
