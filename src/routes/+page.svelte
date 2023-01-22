<script type="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

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

<section>
	<div class="card lg:card-side bg-slate-400 shadow-xl">
		<figure><img src="https://placeimg.com/400/400/arch" alt="Album" /></figure>
		<div class="card-body">
			<!-- <Icon icon="icon-park-twotone:bachelor-cap-one" /> -->
			<h2 class="card-title">Get your academic project done in Time:</h2>

			<span
				>We are here to help you finish your academic project, assignment or what ever you are
				passing..
				<br />We need you to focus on other subjects, and leave us the room to make the work for you
			</span>
			NEW FEATURE
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

<style>
</style>
