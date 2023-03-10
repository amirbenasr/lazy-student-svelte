<script type="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	import { ProjectTech } from '$lib/utils/utils';
	import toast from 'svelte-french-toast';
	import type { Project } from '$lib/types/project.type';
	import { goto } from '$app/navigation';

	export let form: ActionData;

	let selectValue = 'WEB';
	let numberOfPages = 1;
	let totalPrice = 50;
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

	const createProject = async (project: Project): Promise<any> => {
		const response = await fetch('http://localhost:3000/projects/create', {
			method: 'POST',
			body: JSON.stringify(project),
			credentials: 'include',
			headers: {
				'Content-type': 'application/json'
			}
		});

		const body = await response.json();

		return new Promise((resolve, reject) => {
			if (body.success) {
				console.log(JSON.stringify(body));
				resolve(200);
			} else {
				reject();
			}
		});
	};

	async function delay(ms: number, cb: any): Promise<any> {
		const promise1 = new Promise((resolve) => setTimeout(resolve, 3000));
		await promise1
			.then((_) => {
				console.log('waiting 3 seconds untile execution');
				return cb;
				// return _;
			})
			.then((val) => {
				return val();
			})
			.then((val) => {
				console.log('value returned from above promise' + val);
				goto('/projects');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function updateTitle(
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }
	): any {
		const value = event.currentTarget.value;
		titleLength = value;
	}
	const scrollToBottom = async (node: HTMLElement) => {
		node.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const submitFunction: SubmitFunction = async ({ action, cancel, controller, data, form }) => {
		return async ({ update, action, result }) => {
			const { project } = result.data;
			if ('data' in result)
				if (!result?.data?.errors) {
					toast.promise(
						delay(3000, () => createProject(project)),
						{
							loading: 'Creating Project...',
							success: 'Project created!',
							error: 'Could not create project.'
						}
					);
				}
			if ('data' in result)
				if (result?.data?.errors?.title || result?.data?.errors?.description) {
					scrollToBottom(textElement);
				} else if (result?.data?.errors?.category || result?.data?.errors?.technology) {
					scrollToBottom(categoryElement);
				}

			update({ reset: false });
		};
	};
</script>

<form action="?/create" method="POST" use:enhance={submitFunction}>
	<div class="border m-auto p-4   relative shadow-md box-content  space-y-4  ">
		<!-- Title Section -->
		<div
			bind:this={textElement}
			class="project-title-section  flex  flex-row  sm:space-x-24 border p-4 w-full"
		>
			<div class="text flex flex-col w-32 max-w-sm">
				<span class="flex-shrink-0 text-2xl">Title</span>
				<span
					>Give your project a logical name,so professors can easly find your project, and start
					working on it</span
				>
			</div>
			<div class="flex-col w-full">
				<label class="label" for="title">Title</label>
				<input
					value={form?.project.title ?? ''}
					class="input input-bordered"
					type="text"
					name="title"
					id="title"
				/>
				{#if form?.errors?.title}
					<div>
						<span class="label-text text-error text-sm">{form.errors.title[0]}</span>
					</div>
				{/if}

				<label class="label" for="description"> Description </label>
				<div class="flex flex-col relative   align-baseline m-0 p-0 ">
					<p class="absolute top-0   z-10 left-2 font-serif translate-y-0  ">
						This project is about
					</p>
					<textarea
						cols="2"
						rows="2"
						class="textarea-bordered -translate-y-[1px] font-serif w-full font-black h-24 input  self-baseline  p-0 pl-2  indent-[147px] shadow-md   "
						name="description"
						id="description"
						maxlength="80"
						on:keyup={updateTitle}
						placeholder="is about creating a ..."
						value={form?.project.description ?? ''}
					/>
					<div class="flex justify-between">
						{#if form?.errors?.description}
							<span class="label-text text-error text-sm">{form.errors.description[0]}</span>
						{/if}
						<div class=" label label-text  ">{titleLength.length}/80</div>
					</div>
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
						class="select {form?.errors?.type ? 'select-error' : ''}   max-w-md"
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
					{#if form?.errors?.type}
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
						class="select {form?.errors?.technology ? 'select-error' : ''} max-w-md "
						value={form?.project?.technology ?? ''}
					>
						<option value="" disabled selected>Select Technology</option>
						{#each ProjectTech[choice.toUpperCase()] as tech}
							<option value={tech.toUpperCase()} class="">{tech}</option>
						{/each}
					</select>

					{#if form?.errors?.technology}
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
			<div class="absolute bottom-0 right-5">Estimated Price is : {totalPrice}$</div>

			<div id="first-section" class=" flex flex-col flex-grow-1 border-6   ">
				<div class="flex md:space-x-4  ">
					<div class="">
						<label for="project-pages" class="flex-shrink-1 flex-col  ">
							<div>
								<span class="label-text">Number of pages</span>
							</div>
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
							<div class="w-64">
								<small class="italic"
									>e.g: If the app only contains a sign-up/login page,it's counted as 2</small
								>
							</div>
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
				<div class="pt-4">
					<label for="project-pages" class="flex flex-col  ">
						<span class="label-text">Budget</span>
						<input
							class="border-2 input "
							type="text"
							name="budget"
							id="budget"
							value={form?.project?.budget ?? '20'}
							min="20"
							max="500"
						/>
						<small class="italic">Your maximum budget for this project</small>
					</label>
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
