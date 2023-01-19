import type { User } from '$lib/types/user.type';
import { writable } from 'svelte/store';

function userStore() {
	const { set, subscribe, update } = writable<User>({});

	return {
		subscribe,
		login: (user: User) => {
			set(user);
		},
		logout: () => {
			set({});
		}
	};
}
export const user = userStore();
