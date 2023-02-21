<script type="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const resetFunction: SubmitFunction = ({ action, cancel, controller, data, form }) => {
		let { password } = Object.fromEntries(data) as { password: string };

		const token = $page.url.searchParams.get('it');
		return async ({ action, form, result, update }) => {
			console.log(token);

			if (!token) {
				toast.error('Invalid request!');
			}

			const tx = await fetch('http://localhost:3000/users/verify', {
				headers: {
					'Content-type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({ password, token: token })
			});

			if (!result?.data?.errors) {
				toast.success('Your password has been reset successfully!');
			}
			update({ reset: false });
		};
	};
</script>

<div class=" ">
	<div class="card shadow-3xl pt-4 pb-4  mb-8 border-b-4  ">
		<form
			method="POST"
			action="?/forget"
			class="flex flex-col items-center"
			use:enhance={resetFunction}
		>
			<h2 class="font-bold text-md self-center mb-4 text-center">Forget Password</h2>
			<div class="flex flex-col ">
				<input
					class="input input-bordered m-2"
					type="password"
					name="new_password"
					id="password"
					placeholder="Password"
					value={form?.data?.new_password ?? ''}
				/>
				{#if form?.errors?.new_password}
					<span class="ml-2 label-text-alt text-error">{form?.errors.new_password[0] ?? ''}</span>
				{/if}

				<input
					class="input input-bordered m-2"
					value={form?.data?.password ?? ''}
					type="password"
					name="password"
					id="password"
					placeholder="Confirm Password"
				/>
				{#if form?.errors?.password}<span class="label-text-alt text-error m-2"
						>{form?.errors?.password}</span
					>
				{/if}
				{#if form?.errors?.password_mismatch}<span class="label-text-alt text-error m-2"
						>Password mismatch</span
					>
				{/if}
			</div>

			<button type="submit" class="btn w-28  mt-3 ">Login</button>
			<hr />
		</form>
	</div>
</div>
