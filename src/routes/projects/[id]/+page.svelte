<script type="ts">
	import Project from '../project.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { id, projectDetails } = data;
</script>

<div class="flex m-auto">
	<div class="flex flex-col">
		<span class="font-bold">{projectDetails.name}</span>
		<span class="font-semibold"
			>Technology: <span class="text-md font-light">
				{projectDetails.type.toLowerCase()},{projectDetails.technology.toLowerCase()}</span
			></span
		>
	</div>
</div>
