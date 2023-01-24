<script type="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	// import { type FormData } from '$app/environment/types';

	import Techinput from './techinput.svelte';

	let selectValue = '1';

	let date = new Date(new Date().getTime() + 60 * 60 * 24 * 1000).toISOString().slice(0, 10);
	export let form: ActionData;
	let submit = false;
	let titleLength: string = '';
</script>

<form action="?/create" method="post">
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
					name="project-title"
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
					<select name="project-type" id="project" bind:value={selectValue} class="border-2 w-56">
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
				<Techinput choice={selectValue} />
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
								name="project-pages"
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
								name="project-deadline"
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
