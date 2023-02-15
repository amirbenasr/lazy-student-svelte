<script type="ts">
	import { enhance, type applyAction, type SubmitFunction } from '$app/forms';

	import type { ActionData, PageData } from './$types';
	import { success, failure, warning } from '$lib/components/toast';
	import Reset from './reset.svelte';

	export let form: ActionData;
	$: RESET = false;

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

{#if RESET}
	<Reset bind:RESET />
{:else}
	<div class=" ">
		<div class="card shadow-3xl pt-4 pb-4  mb-8 border-b-4  ">
			<form
				method="POST"
				action="?/login"
				class="flex flex-col items-center"
				use:enhance={submitLoginUser}
			>
				<h2 class="font-bold text-md self-center mb-4 text-center">Sign in to Lazy-Student</h2>
				<div class="flex flex-col ">
					<input
						class="input input-bordered m-2"
						type="text"
						name="email"
						id="email"
						value={form?.data?.email ?? ''}
						placeholder="Email or username."
					/>
					{#if form?.errors?.email}
						<span class="ml-2 label-text-alt text-error">{form?.errors.email[0] ?? ''}</span>
					{/if}

					<input
						class="input input-bordered m-2"
						value=""
						type="password"
						name="password"
						id="password"
						placeholder="Password"
					/>
					{#if form?.errors?.password}<span class="label-text-alt text-error m-2"
							>{form?.errors?.password[0] ?? ''}</span
						>
					{/if}
					{#if form?.wrong_password}<span class="text-sm font-extralight text-red-500 text-left"
							>Check your credentials</span
						>
					{/if}
					<span
						class="label-text-alt ml-2 link"
						on:click={() => {
							RESET = true;
						}}>Forgot password?</span
					>
				</div>

				<button type="submit" class="btn w-28  mt-3 ">Login</button>
				<hr />
				<span class="text-l  pt-3 self-center text-center"
					>Not a member yet? <a href="/signup" class="text-blue-400 hover:underline">Join now</a
					></span
				>
			</form>
		</div>
	</div>
{/if}
