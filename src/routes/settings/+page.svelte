<script type="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		// themeChange(false);
		// 👆 false parameter is required for svelte
	});
	let username = 'amir';
	let url = 'http://localhost:3000/users/reset/it?=token';
</script>
