<script type="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	import type { ActionData, PageData } from './$types';
	import { success, failure, warning } from '$lib/components/toast';

	export let form: ActionData;

	export let data: PageData;

	const submitLoginUser: SubmitFunction = ({ form, data, action, cancel }) => {
		// console.log(form);

		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					success('Logged in Successfully!');
					break;
				case 'failure':
					warning('Verify your credentials');
					break;

				default:
					break;
			}
			update({ reset: false });
		};
	};
</script>

<div class="card shadow-2xl p-10   w-96 m-auto mb-8 ">
	<h1 class="font-bold text-2xl self-center mb-8">Sign in to Lazy-Student</h1>
	<form method="post" class="w-auto    " use:enhance={submitLoginUser}>
		<div class="flex flex-col space-y-3">
			<input
				class="h-12 border-2 border-indigo-100 px-3"
				type="text"
				name="email"
				id="email"
				value={form?.email ?? ''}
				placeholder="Email / username"
			/>
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				class="h-12 border-2 border-indigo-100 px-3"
			/>
			{#if form?.empty}<small class="error" style="color: red;">password field is required</small>
			{/if}
			{#if form?.missing}<small style="color: red;">email field is required</small> {/if}
		</div>

		<button type="submit" class="btn w-full mt-3 ">Login</button>
	</form>
</div>

<style>
</style>
