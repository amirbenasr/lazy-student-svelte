<script type="ts">
	import { enhance, type applyAction, type SubmitFunction } from '$app/forms';

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
			// applyAction(action);
		};
	};
</script>

<div class=" self-center box-content card shadow-3xl pt-4 pb-4  mb-8 border-b-4  ">
	<form method="post" class="flex flex-col items-center" use:enhance={submitLoginUser}>
		<h2 class="font-bold text-md self-center mb-8 text-center">Sign in to Lazy-Student</h2>
		<div class="flex flex-col  space-y-3 w-64">
			<input
				class="h-12 border-2 w-32 border-indigo-100 px-3 relative"
				type="text"
				name="email"
				id="email"
				value={form?.data?.email ?? ''}
				placeholder="Email or username."
			/>
			{#if form?.errors?.email}
				<span class="text-sm font-extralight text-red-500 text-left"
					>{form?.errors.email[0] ?? ''}</span
				>
			{/if}

			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				class="h-12 border-2 border-indigo-100 px-3"
			/>
			{#if form?.errors?.password}<span class="text-sm font-extralight text-red-500 text-left"
					>{form?.errors?.password[0] ?? ''}</span
				>
			{/if}
			{#if form?.wrong_password}<span class="text-sm font-extralight text-red-500 text-left"
					>Check your credentials</span
				>
			{/if}
		</div>

		<button type="submit" class="btn w-full mt-3 ">Login</button>
		<hr />
		<span class="text-l  pt-3 self-center text-center"
			>Not a member yet? <a href="/signup" class="text-blue-400 hover:underline">Join now</a></span
		>
	</form>
</div>

<style>
</style>
