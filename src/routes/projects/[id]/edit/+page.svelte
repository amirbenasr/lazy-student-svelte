<script type="ts">
	import type { LayoutData, LayoutServerData } from '../$types';
	import type { PageData, PageServerData } from './$types';

	export let data: LayoutServerData;

	const { projectDetails } = data;
</script>

<div class="prose">
	<h3>Editing project</h3>

	<p>{JSON.stringify(projectDetails)}</p>
</div>
