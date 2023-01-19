import { writable } from 'svelte/store';

import type { Project } from '$lib/types/project.type';
function createProjectStore() {
	var projects: Project[] = [];

	const { set, subscribe, update } = writable<Project[]>(projects);

	return {
		subscribe,
		addProject: (project: Project) => set([project, ...projects]),
		deleteProject: (id: string) => {
			update((list) => list.filter((val) => val.id != id));
		},
		assignProjects: (_projects: Project[]) => {
			set(_projects);
			projects = _projects;
		}
	};
}

export const projects = createProjectStore();
