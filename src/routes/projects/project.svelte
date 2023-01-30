<script type="ts">
	import { goto } from '$app/navigation';
	import { format, subDays, formatRelative } from 'date-fns';

	import type { Project } from '$lib/types/project.type';
	import Datetimer from './datetimer.svelte';
	export let project: Project;
</script>

<div
	class="card  bg-slate-300 w-60 h-60 p-4 m-4 relative shadow-xl cursor-pointer"
	on:click={() => goto(`projects/${project.id}`)}
>
	<h2 class="card-title ">{project.name}</h2>
	<h3 class="pt-1 pb-3">Mobile app</h3>
	<p class="m-0 p-0">
		Deadline: {format(Date.parse(project.deadline.toString()), 'yyyy-MM-dd hh:mm')}
	</p>

	<div class="status rounded   absolute top-0 right-0 text-red-500 font-2thin text-xs p-1 ">
		Pending
	</div>
	<div class="p-0 m-0 text-xs ">
		Submitted by {project.name} <br />
		{formatRelative(new Date(), Date.parse(project.deadline.toString()))}
	</div>
	<Datetimer id={project.id} date={Date.parse(project.deadline.toString())} />

	<!-- {#if project.type == 'WEB'}
		web card
	{/if}

	{#if project.type == 'BACKEND'}
		mobile card
	{/if} -->

	<!-- <div
		class="card   bg-slate-300 w-60 h-60 p-4 m-4 relative shadow-xl cursor-pointer"
		on:click={() => goto('projects/new_project')}
	>
		<div class="card-content flex flex-col justify-center self-center items-center h-full">
			<p class="text-6xl ">+</p>
			<p class="text-xl text-li">Add new Project</p>
		</div>
	</div> -->
</div>
