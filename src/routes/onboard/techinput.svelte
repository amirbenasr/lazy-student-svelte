<script type="ts">
	export let choice: string;

	import { ProjectTech } from '$lib/utils/utils';
</script>

<div class="first-section w-96  ">
	<label for="project-tech" class="">
		Technology or Framework
		<select name="project-tech" id="project-tech" class="border-2 w-32  ">
			{#each ProjectTech[choice] as tech}
				<option value={tech}>{tech}</option>
			{/each}
		</select>
		<br />
		<small>Technology that the project requires</small>
	</label>
</div>
