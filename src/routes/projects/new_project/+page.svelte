<script type="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	import { ProjectTech } from '$lib/utils/utils';
	// import { type FormData } from '$app/environment/types';

	let selectValue = '1';

	let date = new Date(new Date().getTime() + 60 * 60 * 24 * 1000).toISOString().slice(0, 10);
	export let form: ActionData;
	export let choice: string = '1';

	let submit = false;
	let titleLength: string = '';
	const changeValue = (e: Event) => {
		const target = e.target as HTMLTextAreaElement;
		selectValue = target.value as string;
		choice = selectValue;
	};

	// stepper
	let step = 1;
</script>

<form
	action="?/create"
	method="post"
	use:enhance={({ form, data, cancel, action }) => {
		console.log(form);
	}}
>
	<div class="border m-auto p-4  shadow-md box-content  space-y-4  ">
		<!-- Title Section -->
		<div class="project-title-section  flex  md:flex-row  sm:space-x-24 border p-4 w-full">
			<div class="text flex flex-col w-32 max-w-sm">
				<span class="flex-shrink-0 text-2xl">Title</span>
				<span
					>Give your project a logical name,so professors can easly find your project, and start
					working on it</span
				>
			</div>
			<div class="flex-grow relative font-sans inline-block align-baseline m-0 p-0 ">
				<span class="absolute top-0  z-10 left-5">This project is about </span>
				<textarea
					cols="2"
					rows="2"
					class="w-full h-24 input  shadow-md indent-36 font-sans align-baseline "
					name="project_title"
					bind:value={titleLength}
					maxlength="80"
				/>
				<div class="counter">{titleLength.length}/80</div>
			</div>
		</div>
		<!-- Category section -->
		<div class="project-category-section flex space-x-4  md:space-x-24 border p-4 w-full">
			<div class="text flex flex-col w-32 max-w-sm">
				<span class="flex-shrink-0 text-2xl">Category & Technology</span>
				<span>Select the Category of the app you want to create,and the technology</span>
			</div>
			<div class="flex flex-grow  flex-col md:flex-row md:space-x-4  ">
				<div id="first-section" class="flex flex-col   ">
					<select name="project_type" id="project" class="border-2 w-56" on:change={changeValue}>
						<option disabled selected>select project type</option>
						<option value="1">Web</option>
						<option value="2">Mobile</option>
						<option value="3">Backend</option>
						<option value="4">Fullstack</option>
					</select>
					<small class="italic break block w-40 break-words ">
						e.g: If you're looking to develop a website choose web,if mobile and web select
						Full-stack
					</small>
				</div>
				<!-- Project technology -->
				<div class="first-section  flex flex-col ">
					<select name="project_tech" id="project-tech" class="border-2 max-w-md ">
						<option disabled selected>select your technology</option>
						{#each ProjectTech[choice] as tech}
							<option value={tech} class="">{tech}</option>
						{/each}
					</select>
					<small class="italic">Technology that the project requires</small>
				</div>
			</div>
		</div>

		<!-- Deadline Section -->
		<div class="deadline-section flex space-x-4 sm:space-x-24 border p-4 w-full">
			<div class="text flex flex-col w-32 max-w-sm">
				<span class=" text-2xl">Deadline & Number of pages</span>
				<span>Select Carefully your deadline,and how many pages your app requires</span>
			</div>
			<div class="flex space-x-4 ">
				<div id="first-section" class="flex flex-col flex-1  ">
					<div class="flex justify-around  ">
						<label for="project-pages" class="flex flex-col flex-1">
							Number of pages
							<input
								class="border-2 w-20"
								type="number"
								name="project_pages"
								id="project-pages"
								value="1"
								min="1"
								max="8"
							/>
							<small class="w-40"
								>e.g: If the app only contains a sign-up/login page,it's counted as 2</small
							>
						</label>
						<label for="project-deadline" class="flex flex-col flex-1">
							Deadline
							<input
								type="date"
								name="project_deadline"
								id="project-pages"
								value={date}
								min={date}
								class="border-2"
							/>
							<small>the latest time or date by which the project should be completed</small>
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="flex justify-center">
			<button class="btn" type="submit">Creat Project</button>
		</div>
	</div>
</form>