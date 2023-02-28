<script type="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Tech from '$lib/components/tech.svelte';

	import { technologies } from '$lib/types/technology.type';
	import { formatAgoDate, getUserAvatar } from '$lib/utils/utils';
	export let data: PageData;
	let profile = data.profile;
	let projects = [];
	const checkLogin = () => {
		if (!profile) {
			goto('/login');
		} else {
			goto('/projects');
		}
	};

	const fetchProjects = async (order = 'asc', status = 'pending') => {
		const response = await fetch(`http://localhost:3000/projects/feed?order=${order}`);
		const body = await response.json().then((val: any) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(val);
				}, 1000);
			});
		});
		projects = body;

		return projects;
	};

	let promise = fetchProjects();
	//  fetchProjects()
</script>

{#if !$page.data.profile}
	<div
		class="hero h-[600px] max-w-full"
		style="background-image: url('https://media.istockphoto.com/id/494587588/photo/teacher-helping-a-trouble-teenager.jpg?s=612x612&w=0&k=20&c=E8DfAbG5Q5R2EVltLX8quIVlHOjGMZ2vUW6CtXri2j8=');"
	>
		<div class="hero-overlay bg-opacity-60" />
		<div class="hero-content text-center text-neutral-content">
			<div class="max-w-md">
				<h1 class="mb-5 text-5xl font-bold">Get your academic project done in Time</h1>
				<p class="mb-5">
					We are here to help you finish your academic project, assignment or whatever you are
					passing.. We need you to focus on other subjects, and leave us the room to make the work
					for you
				</p>
				<button class="btn btn-primary">Get Started</button>
			</div>
		</div>
	</div>

	<div class="divider" />
	<div class="prose max-w-none w-full ">
		<h1>Academic Projects that we support</h1>

		<!-- ... -->
		<div class="flex flex-wrap   ">
			{#each technologies as technology}
				<Tech {technology} />
			{/each}
		</div>
	</div>
{/if}

{#if $page.data.profile?.user?.role == 'STUDENT'}
	<section class="p-4 flex flex-col max  items-center xl:items-start space-y-4">
		<p class="text-xl text-justify  font-normal">
			Welcome dear <span class="text-xl font-medium">{$page.data.profile.user.username}</span>,
			<br />
			this is the main feed where you can see all of your projects created here. <br /> You currently
			have no projects , select the button below to create your first project.
		</p>
		<a href="/projects/new_project">
			<button class="btn gap-2 m-1"> Create your project </button>
		</a>
	</section>
{:else if $page.data.profile?.user?.role == 'PROFESSOR'}
	<section class="p-4 flex flex-col max-w-4xl m-auto  items-center xl:items-start space-y-4">
		<p class="text-xl text-justify  font-normal">
			Welcome dear professor <span class="text-xl font-medium"
				>{$page.data.profile.user.username}</span
			>,
			<br />
			this is the main feed where you can see all student projects created here. <br /> There are currently
			no projects.
		</p>

		<div class="filter-section">
			<div class="form-control w-full max-w-xs">
				<label for="order" class="label-text">
					<span class="label-text">Filter by</span>
				</label>
				<select
					class="select select-bordered max-w-xs"
					id="order"
					on:change={(e) => {
						const order = e.target?.value;
						promise = fetchProjects(order);
					}}
				>
					<option value="asc" selected>Newest</option>
					<option value="desc">Oldest</option>
				</select>
			</div>
		</div>
		{#await promise}
			Loading projects
		{:then projects}
			<div class="w-full">
				{#each projects as project}
					<div class="project card  flex  flex-col h-40 shadow-md m-4 relative">
						<!-- <span class="badge badge-sm badge-primary absolute right-0 mb-4 mr-2"
							>{project.status}</span
						> -->

						<div class="flex flex-row">
							<div class="avatar flex-col item p-4 items-center">
								<div class="w-12 rounded-full  bg-white">
									<img src={getUserAvatar(project.createdBy.Profile)} alt="" srcset="" />
								</div>

								<span class="text-sm">{project.createdBy.username}</span>
							</div>
							<div class="border-left w-0.5 m-0 h-auto  divider-vertical  bg-gray-200" />
							<div class=" p-4">
								<p class="">{project.title}</p>
								<p class="sub-title text-sm font-light">{project.technology}</p>
								<p class="text-xs font-light">submitted : {formatAgoDate(project.createdAt)}</p>
							</div>
						</div>
						<hr />
						<div class="flex-grow card-actions items-center  justify-end  ">
							<a href="/projects/{project.id}" class="btn btn-xs btn-primary mr-2">View Details</a>
							<!-- <button class="btn btn-xs">Not Interested</button> -->
						</div>
					</div>
				{/each}
			</div>
		{/await}
	</section>
{/if}

<style>
</style>
