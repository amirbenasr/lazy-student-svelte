<script type="ts">
	import type { PageData } from './$types';
	import Project from './project.svelte';
	export let data: PageData;

	var projects = data.projects;
</script>

<h1>Current Projects</h1>
<h2>current number of projects : {projects.length}</h2>
{#each projects as project}
	<Project {project} />
{/each}
