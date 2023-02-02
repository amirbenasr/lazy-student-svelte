<script type="ts">
	import Project from '../project.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { id, projectDetails } = data;
</script>



<div class="flex-col">
	
	<h1>Project name : {projectDetails.name}</h1>
	<h2 class="m-2">Project description : {projectDetails.description}</h2>
	<textarea name="" id="" cols="30" class="m-4" rows="5" placeholder="describe more your project...">{projectDetails.description}</textarea>
	
	{JSON.stringify(projectDetails)}

</div>