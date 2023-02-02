<script lang="ts">
	// import '@skeletonlabs/skeleton/themes/';

	// Optionally set default options here
	import '../app.postcss';
	import { page } from '$app/stores';
</script>

<div class="navbar flex p-1">
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
							<img src="https://picsum.photos/200/300" class="w-24 h-24" />
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
				</ul>
			</div>
		</span>
		<!-- <div class="flex-none">
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
							<a href="/{$page.data.profile.user?.username ?? ''}" class="justify-between">
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
			</div> -->
	{/if}
</div>
<!-- Router Slot -->
<hr />
<div class="w-3/4 mx-auto">
	<slot />
</div>
<hr />

<!-- ---- / ---- -->
<footer class="footer footer-center p-4 bg-base-300 text-base-content mt-4">
	<div>
		<p>Copyright © 2023 - All right reserved by LS-Co. Ltd</p>
	</div>
</footer>
