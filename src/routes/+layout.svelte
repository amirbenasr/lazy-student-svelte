<script lang="ts">
	// import '@skeletonlabs/skeleton/themes/';
	import toast, { Toaster } from 'svelte-french-toast';

	// Optionally set default options here
	import '../app.postcss';
	import { page } from '$app/stores';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import { base } from '$app/paths';

	const scrolled = writable(false);

	onMount(() => {
		$scrolled = false;
		window.addEventListener('scroll', function () {
			const val = this.scrollY;
			if (val != 0) {
				$scrolled = true;
			} else {
				$scrolled = false;
			}
		});
	});
</script>

<Toaster />

<div class="relative h-screen w-screen">
	<!-- Add verification banner at the top  -->
	{#if $page.url.searchParams.get('verification') === 'true'}
		<div
			id="banner"
			class="sticky top-0 z-40 flex h-12  bg-primary text-white font-semibold justify-center items-center  "
		>
			<p class="">your email has been verified successfully!</p>
		</div>
	{/if}
	{#if $page.data.profile}
		<!--login banner  -->
		<!-- <div class="banner h-12 bg-green-500 text-center flex justify-center items-center ">
			<p class="text-white font-semibold">You are already logged in!</p>
		</div> -->
		<nav class="p-6 navbar flex bg-white border-b-2">
			<div class="flex-1">
				<a class=" " href="/">Lazy-Student</a>
			</div>

			<span class="relative">
				<!-- Trigger: apply the 'use:menu' action and supply the unique menu ID -->

				<!-- Menu: set a matching 'data-menu-[menuId]' attribute -->
				<div class="dropdown dropdown-end">
					<label tabindex="0">
						<div class="avatar  online cursor-pointer">
							<div class="w-12 rounded-full">
								<img src={$page.data.profile.avatar} class="w-24 h-24" />
							</div>
						</div>
					</label>

					<ul
						tabindex="0"
						class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 divide-y-2"
					>
						<li>
							<a href="/{$page.data.profile.user?.username ?? ''}" class="justify-between">
								Profile
							</a>
						</li>
						<li>
							<a href="/projects" class="justify-between"> Projects </a>
						</li>
						<li>
							<a href="/settings">Settings</a>
						</li>
						<li>
							<form method="post" action="/logout?/logout">
								<button>Logout</button>
							</form>
						</li>
					</ul>
				</div>
			</span>
		</nav>
	{:else if $page.route.id == '/'}
		<nav
			class="transition-all duration-200 {$scrolled
				? 'bg-white opacity-95'
				: 'bg-transparent'}   ease-in  p-8  fixed navbar flex  z-50 "
		>
			<div class="pl-0 pr-0 m-auto flex w-screen  justify-between ">
				<div class="flex ">
					<a class=" text-{$scrolled ? 'black' : 'white'}  font-medium" href="/">Lazy-Student</a>
				</div>

				<div class="flex ">
					<ul class="flex space-x-8 ">
						<li class="text-{$scrolled ? 'black' : 'white'}  font-medium ">
							<a href="/login">Sign-in</a>
						</li>
						<li class="text-{$scrolled ? 'black' : 'white'} font-medium ">
							<a href="/signup">Join</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	{:else}
		<nav class=" p-6 navbar flex  ">
			<div class="flex-1">
				<a class="  font-medium" href="/">Lazy-Student</a>
			</div>

			<ul class="space-x-8 ">
				<li class=" font-medium "><a href="/login">Sign-in</a></li>
				<li class=" font-medium "><a href="/signup">Join</a></li>
			</ul>
		</nav>
	{/if}
	<!-- Router Slot -->
	<hr />
	<div class="mx-8">
		<slot />
	</div>
	<hr />

	<Footer />
</div>
