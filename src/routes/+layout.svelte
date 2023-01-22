<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';

	// Optionally set default options here
	import '../app.css';

	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
</script>

<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<div class="main-wraper">
	<div class="m-auto">
		<div class="navbar flex">
			<div class="flex-1">
				<a class="btn btn-ghost normal-case text-xl" href="/">Lazy-Student</a>
			</div>
			{#if !$page.data.profile}
				<div class="btn btn-outlined"><a href="/login">Login</a></div>
			{/if}
			{#if $page.data.profile}
				<div class="flex-none">
					<div class="dropdown dropdown-end">
						<label tabindex="-1" for="" class="btn btn-ghost btn-circle avatar">
							<div class="w-10 rounded-full">
								<img src="https://placeimg.com/80/80/people" alt="" />
							</div>
						</label>
						<ul
							tabindex="-1"
							class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a href="/wuhhh" class="justify-between">
									Profile
									<span class="badge">New</span>
								</a>
							</li>
							<li>
								<a href="/projects" class="justify-between">Projects</a>
							</li>
							<li>
								<form method="post" action="/logout?/logout">
									<button>Logout</button>
								</form>
							</li>
						</ul>
					</div>
				</div>
			{/if}
		</div>

		<div class="container">
			<slot />
		</div>

		<footer class="footer footer-center p-4 bg-base-300 text-base-content mt-4">
			<div>
				<p>Copyright © 2023 - All right reserved by LS-Co. Ltd</p>
			</div>
		</footer>
	</div>
</div>

<style>
</style>
