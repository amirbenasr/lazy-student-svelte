<script type="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	import { ProjectTech } from '$lib/utils/utils';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	// import { type FormData } from '$app/environment/types';
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let actionData: ActionData;

	let selectValue = 'MOBILE';
	let numberOfPages = 1;
	let totalPrice = 5;
	let infoFilled: Boolean = false;
	const active: Writable<number> = writable(0);
	let date = new Date(new Date().getTime() + 60 * 60 * 24 * 1000).toISOString().slice(0, 10);
	export let choice: string = 'MOBILE';

	let submit = false;
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
	const onComplete: any = () => {
		/* handle the event */
		alert(step);
		return;
	};
	const onNext: any = () => {
		/* handle the event */
		alert(step);
		return;
	};

	onMount(() => {
		alert('re-render');
	});
	// stepper
	let step = 0;
</script>

<form action="?/create" method="post">
	<div class="border m-auto p-4   relative shadow-md box-content  space-y-4  ">
		<Stepper {active} length={2} on:complete={onComplete} rounded="sm">
			<Step index={0}>
				<svelte:fragment slot="header">
					<h3>Fill in necessary informations</h3>
				</svelte:fragment>

				<!-- Title Section -->
				<div class="project-title-section  flex  flex-row  sm:space-x-24 border p-4 w-full">
					<div class="text flex flex-col w-32 max-w-sm">
						<span class="flex-shrink-0 text-2xl">Title</span>
						<span
							>Give your project a logical name,so professors can easly find your project, and start
							working on it</span
						>
					</div>
					<div class="flex-grow relative  inline-block align-baseline m-0 p-0 ">
						<span class="absolute top-0  z-10 left-2">This project is about</span>
						<textarea
							cols="2"
							rows="2"
							class="w-full h-24 input pl-3  m-0 p-0 indent-36 shadow-md   align-baseline "
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
							<select
								name="project_type"
								id="project"
								class="border-2 w-56"
								on:change={changeValue}
							>
								<!-- <option disabled selected>select project type</option> -->
								<option value="Web">Web</option>
								<option value="Mobile">Mobile</option>
								<option value="Backend">Backend</option>
								<option value="Fullstack">Fullstack</option>
							</select>
							<small class="italic break block w-40 break-words ">
								e.g: If you're looking to develop a website choose web,if mobile and web select
								Full-stack
							</small>
						</div>
						<!-- Project technology -->
						<div class="first-section  flex flex-col ">
							<select name="project_tech" id="project-tech" class="border-2 max-w-md ">
								<!-- <option disabled selected>select your technology</option> -->

								{#each ProjectTech[choice.toUpperCase()] as tech}
									<option value={tech} class="">{tech}</option>
								{/each}
							</select>
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
									Number of pages
									<input
										class="border-2 "
										type="number"
										name="project_pages"
										id="project-pages"
										bind:value={numberOfPages}
										min="1"
										max="8"
										on:change={updatePrice}
									/>
									<small class="w-40"
										>e.g: If the app only contains a sign-up/login page,it's counted as 2</small
									>
								</label>
							</div>
							<div class="deadline">
								<label for="project-deadline" class="flex flex-col  w-36">
									Deadline
									<input
										type="date"
										name="project_deadline"
										id="project-pages"
										value={date}
										min={date}
										class="border-2 "
									/>
									<small>the latest time or date by which the project should be completed</small>
								</label>
							</div>
						</div>
					</div>
				</div>
			</Step>
			<Step index={1}>(hello world)</Step>
		</Stepper>

		<div class="flex justify-center">
			{#if step === 2}
				<button class="btn" type="submit">Creat Project</button>
			{/if}
		</div>
	</div>
</form>

<style>
	input[type='number']::-webkit-inner-spin-button {
		opacity: 1;
	}
</style>
