<script type="ts">
	import type { PageData } from './$types';
	import Project from './project.svelte';
	export let data: PageData;

	var projects = data.projects;
	var filtered = [...projects];

	const filterProjects = (e: Event) => {
		const element = e.target as HTMLSelectElement;
		const filtertype = element.value.toUpperCase();

		if (!filtertype) {
			filtered = [...projects];
			return;
		}
		filtered = projects.filter((val) => val.type == filtertype);
	};
</script>

<div class="flex flex-col">
	<h1 class="p-4 text-xl font-bold">Your Projects</h1>
	<div class="flex justify-around items-center">
		<h2 class="pl-4">You have {projects.length} projects</h2>
		<select class="select  select-bordered select-md" on:change={filterProjects}>
			<option selected value="">All</option>
			<option value="web">Web</option>
			<option value="mobile">Mobile</option>
			<option value="fullstack">Fullstack</option>
		</select>
	</div>
	<div class="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 p-0 m-0  ">
		{#if filtered.length == 0}
			<p class="p-4">You currently have no projects</p>
		{/if}
		{#each filtered as project}
			<Project {project} />
		{/each}
	</div>
</div>
