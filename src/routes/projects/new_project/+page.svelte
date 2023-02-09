<script type="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	import { ProjectTech } from '$lib/utils/utils';
	import { onMount, tick } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	export let form: ActionData;

	let selectValue = 'WEB';
	let numberOfPages = 1;
	let totalPrice = 5;
	let date = new Date(new Date().getTime() + 60 * 60 * 24 * 1000).toISOString().slice(0, 10);
	export let choice: string = 'WEB';

	let titleLength: string = '';
	const updatePrice = (e: Event) => {
		const target = e.target as HTMLTextAreaElement;
		numberOfPages = Number.parseInt(target.value as string);
		totalPrice = 45 + numberOfPages * 5;
	};
	const changeValue = (e: Event) => {
		const target = e.target as HTMLTextAreaElement;
		selectValue = target.value as string;
		choice = selectValue;
	};

	// stepper
	let textElement: HTMLElement;
	let categoryElement: HTMLElement;
	let pagesElement: HTMLElement;

	function updateTitle(
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }
	): any {
		console.log(event.currentTarget.value);
		const value = event.currentTarget.value;
		titleLength = value;
	}
	const scrollToBottom = async (node: HTMLElement) => {
		node.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const delay = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
</script>

<form
	action="?/create"
	method="POST"
	use:enhance={({ data, cancel, action, controller }) => {
		return async ({ update, action, result }) => {
			toast.promise(delay(3000), {
				loading: 'Creating Project...',
				success: 'Project created!',
				error: 'Could not create project.'
			});

			// const { errors, project } = result.data;
			// if (errors.name) {
			// 	scrollToBottom(textElement);
			// }
			// if (errors.category || errors.technology) {
			// 	scrollToBottom(categoryElement);
			// }

			update({ reset: false });
		};
	}}
>
	<div class="border m-auto p-4   relative shadow-md box-content  space-y-4  ">
		<!-- Title Section -->
		<div class="project-title-section  flex  flex-row  sm:space-x-24 border p-4 w-full">
			<div class="text flex flex-col w-32 max-w-sm">
				<span class="flex-shrink-0 text-2xl">Title</span>
				<span
					>Give your project a logical name,so professors can easly find your project, and start
					working on it</span
				>
			</div>
			<div bind:this={textElement} class="flex-grow relative  inline-block align-baseline m-0 p-0 ">
				<span class="absolute top-0  z-10 left-2">This project is about</span>
				<textarea
					cols="2"
					rows="2"
					class="w-full h-24 input pl-3  m-0 p-0 indent-36 shadow-md   align-baseline "
					name="name"
					maxlength="80"
					on:keyup={updateTitle}
					value={form?.project.name ?? ''}
				/>
				<div class="flex justify-between">
					{#if form?.errors?.name}
						<span class="label-text text-error text-sm">{form.errors.name[0]}</span>
					{/if}
					<div class="label-text  ">{titleLength.length}/80</div>
				</div>
			</div>
		</div>
		<!-- Category & Technology section -->
		<div class="project-category-section flex space-x-4  md:space-x-24 border p-4 w-full">
			<div class="text flex flex-col w-32 max-w-sm">
				<span class=" text-2xl">Category & Technology</span>
				<span>Select the Category of the app you want to create,and the technology</span>
			</div>
			<div class="flex flex-1 flex-col md:flex-row space-x-2 ">
				<div id="first-section" class="flex flex-col ">
					<select
						bind:this={categoryElement}
						name="type"
						id="project"
						class="select {form?.errors.type ? 'select-error' : ''}   max-w-md"
						on:change={changeValue}
						value={form?.project.type ?? ''}
					>
						<option value="" disabled selected>Select Category</option>

						<!-- <option disabled selected>select project type</option> -->
						<option value="WEB">Web</option>
						<option value="MOBILE">Mobile</option>
						<option value="BACKEND">Backend</option>
						<option value="FULLSTACK">Fullstack</option>
					</select>
					{#if form?.errors.type}
						<span class="label-text text-error"> {form.errors.type[0]} </span>
					{/if}
					<small class="italic break block break-words ">
						e.g: If you're looking to develop a website choose web,if mobile and web select
						Full-stack
					</small>
				</div>
				<!-- Project technology -->
				<div class="first-section  flex flex-col ">
					<select
						name="technology"
						id="project-tech"
						class="select {form?.errors.technology ? 'select-error' : ''} max-w-md "
						value={form?.project?.technology ?? ''}
					>
						<option value="" disabled selected>Select Technology</option>
						{#each ProjectTech[choice.toUpperCase()] as tech}
							<option value={tech.toUpperCase()} class="">{tech}</option>
						{/each}
					</select>

					{#if form?.errors.technology}
						<span class="label-text text-error">
							{form.errors.technology[0]}
						</span>
					{/if}
					<small class="italic">Technology that the project requires</small>
				</div>
			</div>
		</div>

		<!-- Deadline Section -->
		<div class="flex border p-4 w-full sm:space-x-24 relative ">
			<div class="text flex flex-col w-32 ">
				<span class=" text-2xl">Deadline & Number of pages</span>
				<span>Select Carefully your deadline,and how many pages your app requires</span>
			</div>
			<div class="absolute bottom-0 right-5">Price is : {totalPrice}$</div>

			<div id="first-section" class=" flex flex-grow-1 border-6   ">
				<div class="flex md:space-x-4  ">
					<div class="">
						<label for="project-pages" class="flex flex-col  ">
							<span class="label-text">Number of pages</span>
							<input
								class="border-2 input "
								type="number"
								name="pages"
								id="project-pages"
								value={form?.project.pages ?? '1'}
								min="1"
								max="8"
								bind:this={pagesElement}
								on:change={updatePrice}
							/>
							<small class="italic"
								>e.g: If the app only contains a sign-up/login page,it's counted as 2</small
							>
						</label>
					</div>
					<div class="deadline">
						<label for="project-deadline" class="flex flex-col  w-36">
							<span class="label-text">Deadline</span>
							<input
								type="date"
								name="deadline"
								id="project_deadline"
								value={date}
								min={date}
								class="border-2 input "
							/>
							<small class="italic"
								>the latest time or date by which the project should be completed</small
							>
						</label>
					</div>
				</div>
			</div>
		</div>

		<button class="btn btn-primary w-full" type="submit">Creat project</button>
	</div>
</form>

<style>
	input[type='number']::-webkit-inner-spin-button {
		opacity: 1;
	}
</style>
