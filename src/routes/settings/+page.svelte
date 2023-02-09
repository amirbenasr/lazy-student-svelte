<script type="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<div class="m-5">
	<h2 class="mb-4 text-2xl text-green-700 font-bold">Select</h2>
	<select data-choose-theme class="focus:outline-none h-10 rounded-full px-3 border">
		<option value="">Default</option>
		<option value="dark">Dark</option>
		<option value="black">Black</option>
		<option value="🌸">🌸 Pink</option>
		<option value="🐬">🐬 Blue</option>
		<option value="🐤">🐤 Yellow</option>
	</select>
</div>
