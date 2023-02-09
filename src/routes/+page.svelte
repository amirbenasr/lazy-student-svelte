<script type="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
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
	<div class="prose mx-auto card  shadow-xl text-center m-4">
		<figure class="m-0">
			<img
				src="https://media.istockphoto.com/id/494587588/photo/teacher-helping-a-trouble-teenager.jpg?s=612x612&w=0&k=20&c=E8DfAbG5Q5R2EVltLX8quIVlHOjGMZ2vUW6CtXri2j8="
				alt="Album"
			/>
		</figure>
		<div class="card-body m-0">
			<h2 class="card-title m-0">Get your academic project done in Time</h2>

			<p class="text-left">
				We are here to help you finish your academic project, assignment or whatever you are
				passing.. We need you to focus on other subjects, and leave us the room to make the work for
				you
			</p>
			<div class="card-actions justify-end">
				<button class="btn " on:click={checkLogin}>Get Started</button>
				<button class="btn btn-info" on:click={checkLogin}>How does it work?</button>
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

{#if $page.data.profile}
	<section class="flex flex-col max  items-center xl:items-start space-y-4">
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
{/if}

<style>
</style>
