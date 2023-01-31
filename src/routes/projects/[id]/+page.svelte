<script type="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { id, projectDetails } = data;
</script>

<div class="project-id">project id {data.id}</div>

{JSON.stringify(projectDetails)}

<div class="flex-col">

</div>