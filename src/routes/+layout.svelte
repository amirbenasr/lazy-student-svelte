<script lang="ts">
	// import '@skeletonlabs/skeleton/themes/';
	import toast, { Toaster } from 'svelte-french-toast';

	// Optionally set default options here
	import '../app.postcss';
	import { page } from '$app/stores';
	import Footer from '$lib/components/footer.svelte';
</script>

<Toaster />

<nav class="navbar flex p-1 bg-base-200">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">Lazy-Student</a>
	</div>

	{#if !$page.data.profile}
		<div class="btn btn-secondary  ">
			<a href="/signup">Sign up</a>
		</div>
		<div class="ml-2 btn btn-outline">
			<a href="/login">Login</a>
		</div>
	{/if}
	{#if $page.data.profile}
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
						<form method="post" action="/logout?/logout">
							<button>Logout</button>
						</form>
					</li>
					<li>
						<a href="/settings">Settings</a>
					</li>
				</ul>
			</div>
		</span>
	{/if}
</nav>
<!-- Router Slot -->
<hr />
<div class="w-3/4 mx-auto p-4 ">
	<slot />
</div>
<hr />

<!-- <footer class="footer p-4 bg-base-100 text-base-content">
	<div class="footer-title">Copyright © 2023 - All right reserved by LS-Co. Ltd</div>
</footer> -->
<Footer />
