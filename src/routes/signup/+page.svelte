<script type="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const submitFunction: SubmitFunction = async ({ action, cancel, data, form, controller }) => {
		return async ({ action, form, result, update }) => {
			update({ reset: false });
		};
	};
</script>

<div class="signup-form card shadow-md  ">
	<h2 class="text-center p-4 font-bold">Join lazy student now</h2>
	<form method="POST" class="flex flex-col items-center" use:enhance={submitFunction}>
		<div class="flex flex-col space-y-4">
			<input
				placeholder="Email or username"
				type="email"
				name="email"
				id="email"
				value={form?.data.email ?? ''}
			/>
			{#if form?.errors.email}
				<span class="text-sm font-extralight text-red-500 text-left">{form?.errors.email[0]}</span>
			{/if}

			<input value="" type="password" name="password" placeholder="Password" id="password" />
			{#if form?.errors.password}
				<span class="text-sm font-extralight text-red-500 text-left"
					>{form?.errors.password[0]}</span
				>
			{/if}
			<input
				value=""
				type="password"
				name="confirmpassword"
				placeholder="Confirm password"
				id="password"
			/>
			{#if form?.errors.confirmpassword}
				<span class="text-sm font-extralight text-red-500 text-left"
					>{form?.errors.confirmpassword[0]}</span
				>
			{/if}
		</div>
		<button type="submit" class="mt-8 mb-8">Sign-up</button>
	</form>
</div>

<style>
</style>
