<script type="ts">
	export let choice: string;

	import { ProjectTech } from '$lib/utils/utils';
</script>

<div class="first-section w-min flex flex-col    ">
	<select name="project-tech" id="project-tech" class="border-2 w-56   ">
		{#each ProjectTech[choice] as tech}
			<option value={tech}>{tech}</option>
		{/each}
	</select>
	<small class="italic">Technology that the project requires</small>
</div>
