<script type="ts">
	import { goto } from '$app/navigation';
	import type { Project } from '$lib/types/project.type';
	export let project: Project;
</script>

<div class="flex">
	{#if project.type == 'MOBILE'}
		<div class="card  bg-slate-300 w-60 h-60 p-4 m-4 relative shadow-xl cursor-pointer">
			<h1 class="card-title">{project.name}</h1>
			<h2>Mobile app</h2>
			<p class="card-body">Deadline: {project.deadline.toString()}</p>
			<div class="status rounded   absolute top-0 right-0 text-red-500 font-2thin text-xs p-1 ">
				Pending
			</div>
		</div>
	{/if}
	{#if project.type == 'WEB'}
		mobile card
	{/if}

	{#if project.type == 'BACKEND'}
		mobile card
	{/if}

	<div
		class="card   bg-slate-300 w-60 h-60 p-4 m-4 relative shadow-xl cursor-pointer"
		on:click={() => goto('projects/new_project')}
	>
		<div class="card-content flex flex-col justify-center self-center items-center h-full">
			<p class="text-6xl ">+</p>
			<p class="text-xl text-li">Add new Project</p>
		</div>
	</div>
</div>
