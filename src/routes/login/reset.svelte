<script type="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import toast from 'svelte-french-toast';
	import type { ActionData } from '../$types';
	import z from 'zod';
	export let RESET;
	let emailError: any;
	const emailSchema = z.string().email();

	const submitFunction: SubmitFunction = async ({ data, cancel }) => {
		const { email } = Object.fromEntries(data);

		try {
			emailSchema.parse(email);
			emailError = null;
			toast.success('A reset link has been sent to your email ');
		} catch (error) {
			emailError = error;
			cancel();
		}
	};
</script>

<div class=" ">
	<div class="card shadow-3xl pt-4 pb-4  mb-8 border-b-4  ">
		<form
			method="POST"
			action="?/reset"
			class="flex flex-col items-center"
			use:enhance={submitFunction}
		>
			<h2 class="font-bold text-md self-center mb-2  ">Reset Password</h2>
			<p class="text-[#74767e] font-medium text-center ">
				Please enter your email address, and we'll send you a link to reset your password.
			</p>
			<div class="flex flex-col ">
				<input
					class="input input-bordered m-2"
					type="text"
					name="email"
					id="email"
					placeholder="Email or username."
				/>
				{#if emailError}
					<span class="label-text text-error ml-2">{emailError['issues'][0].message}</span>
				{/if}
			</div>

			<button type="submit" class="btn btn-sm mt-4">Submit</button>

			<button class="link m-4" on:click={() => (RESET = false)}>Back to Login</button>
		</form>
	</div>
</div>
