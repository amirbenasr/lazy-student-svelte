<script type="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import Techinput from './techinput.svelte';

	// import { type FormData } from '$app/environment/types';

	let selectValue = '1';

	let date = new Date().toISOString().slice(0, 10);
	export let form: ActionData;
	let submit = false;
</script>

<div class="flex flex-col border-2  justify-center items-center w-full">
	<form method="post" use:enhance>
		<div class="flex flex-nowrap justify-around mb-4 ">
			<div id="first-section" class="flex flex-col  ">
				<label for="project">
					Project type
					<select name="project-type" id="project" bind:value={selectValue} class="border-2">
						<option value="1">Web</option>
						<option value="2">Mobile</option>
						<option value="3">Backend</option>
						<option value="4">Fullstack</option>
					</select>
					<br />
					<small>
						e.g: If you're looking to develop a website choose web,<br />if mobile and web select
						Full-stack
					</small>
				</label>
			</div>
			<Techinput choice={selectValue} />
		</div>

		<div class="flex p-4 justify-around  ">
			<label for="project-pages" class="">
				Number of pages
				<input type="number" name="project-pages" id="project-pages" value="1" min="1" max="8" />
				<br />
				<small>e.g: If the app only contains a sign-up/login page<br /> , it's counted as 2</small>
			</label>
			<label for="project-pages" class="">
				Deadline
				<input type="date" name="project-deadline" id="project-pages" value={date} min={date} />
				<br />
				<small>the latest time or date by which the project should be completed</small>
			</label>
		</div>

		<!-- Button -->

		{#if !form?.success}
			<button class="btn w-full rounded mt-4" type="submit">Submit</button>
		{/if}

		{#if form?.success}
			<button class="btn w-full rounded mt-4" type="submit" aria-busy="true"
				>Looking for professor...</button
			>
		{/if}
	</form>
</div>

<style>
</style>
