<script type="ts">
	import type { PageData } from './$types';
	import Project from './project.svelte';
	export let data: PageData;

	var projects = data.projects;
</script>

<h1 class="p-4">Your Projects</h1>
<h2 class="pl-4">current number of projects : {projects.length}</h2>
<div class="flex flex-wrap ">
	{#each projects as project}
		<Project {project} />
	{/each}
</div>
