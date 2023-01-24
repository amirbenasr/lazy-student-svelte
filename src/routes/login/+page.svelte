<script type="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';

	import type { ActionData, PageData } from './$types';
	import { success, failure, warning } from '$lib/components/toast';

	export let form: ActionData;

	const submitLoginUser: SubmitFunction = ({ form, data, action, cancel }) => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					success('Logged in Successfully!');
					break;
				case 'failure':
					failure('Verify your credentials');
					break;

				default:
					break;
			}
			update({ reset: false });
		};
	};
</script>

<div class="card shadow-2xl pt-4 pb-4  w-96 m-auto mb-8 border-b-4 ">
	<form method="post" class="w-auto border-b p-6" use:enhance={submitLoginUser}>
		<h1 class="font-bold text-2xl self-center mb-8 text-center">Sign in to Lazy-Student</h1>
		<div class="flex flex-col space-y-3">
			<input
				class="h-12 border-2 border-indigo-100 px-3"
				type="text"
				name="email"
				id="email"
				placeholder="username/e-mail"
			/>
			{#if form?.missingEmail}<small>email field is required</small> {/if}

			<input
				type="password"
				name="password"
				id="password"
				placeholder="password"
				class="h-12 border-2 border-indigo-100 px-3"
			/>
			{#if form?.missingPassword}<small class="error">password field is required</small>
			{/if}
		</div>

		<button type="submit" class="btn w-full mt-3 ">Login</button>
	</form>
	<span class="text-l text-center pt-3"
		>Not a member yet? <a href="/signup" class="text-blue-400 hover:underline">Join now</a></span
	>
</div>

<style>
</style>
