<script type="ts">
	import type { Project } from '$lib/types/project.type';

	export let project: Project;
</script>

{#if project.type == 'MOBILE'}
	<div class="card  bg-slate-300 w-40 h-40 p-4 m-4 relative shadow-xl">
		<h1>Name of the project: {project.name}</h1>
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
