<script type="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Tech from '$lib/components/tech.svelte';

	import { technologies } from '$lib/types/technology.type';
	export let data: PageData;
	let profile = data.profile;
	const checkLogin = () => {
		if (!profile) {
			goto('/login');
		} else {
			goto('/projects');
		}
	};
</script>

{#if !$page.data.profile}
	<div
		class="hero h-[600px]"
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
	<section class="p-4 flex flex-col max  items-center xl:items-start space-y-4">
		<p class="text-xl text-justify  font-normal">
			Welcome dear professor <span class="text-xl font-medium"
				>{$page.data.profile.user.username}</span
			>,
			<br />
			this is the main feed where you can see all student projects created here. <br /> There are currently
			no projects.
		</p>
	</section>
{/if}

<style>
</style>
