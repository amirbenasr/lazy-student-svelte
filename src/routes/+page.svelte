<script type="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data: PageData;
	let profile = data.profile;
	let id = data.id;
	const checkLogin = () => {
		if (!profile) {
			goto('/login');
		} else {
			goto('/projects');
		}
	};
</script>

{#if !$page.data.profile}
	<section>
		<div class="card lg:card-side bg-slate-400 shadow-xl">
			<figure>
				<img
					src="https://media.istockphoto.com/id/494587588/photo/teacher-helping-a-trouble-teenager.jpg?s=612x612&w=0&k=20&c=E8DfAbG5Q5R2EVltLX8quIVlHOjGMZ2vUW6CtXri2j8="
					alt="Album"
				/>
			</figure>
			<div class="card-body">
				<!-- <Icon icon="icon-park-twotone:bachelor-cap-one" /> -->
				<h2 class="card-title">Get your academic project done in Time:</h2>

				<span
					>We are here to help you finish your academic project, assignment or what ever you are
					passing..
					<br />We need you to focus on other subjects, and leave us the room to make the work for
					you
				</span>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={checkLogin}>Get Started</button>
				</div>
			</div>
		</div>
		<!-- <div class="card">
		<h1>
			Get your academic <Icon icon="icon-park-twotone:bachelor-cap-one" /> project done in Time:
		</h1>

		<span
			>We are here to help you finish your academic project, assignment or what ever you are
			passing..
			<br />We need you to focus on other subjects, and leave us the room to make the work for you
			and help you pass your exams, we don't want you to be lazy, but either we don't want you to
			fail..
		</span>

		<button class="btn w-auto" on:click={() => goto('/onboard')}>Get Started</button>
	</div> -->
	</section>
{/if}

{#if $page.data.profile}
	<section class="flex flex-col  items-center xl:items-start space-y-4">
		<p class="text-xl text-justify text-info-content font-normal">
			Welcome dear <span class="text-xl font-medium">{$page.data.profile.user.username}</span>,
			<br />
			this is the main feed where you can see all of your projects created here. <br /> You currently
			have no projects , select the button below to create your first project.
		</p>
		<a href="/projects/new_project">
			<button class="btn gap-2"> Create your project </button>
		</a>
	</section>
{/if}

<style>
</style>
