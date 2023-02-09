<script type="ts">
	import type { technology } from '$lib/types/technology.type';
	export let technology: technology;
</script>

<div class="card w-64 bg-base-100 shadow-xl m-2">
	<div class="card-body">
		<figure class="m-0 p-2">
			<img src={technology.image} alt="react" class="h-20" />
		</figure>
		<h1 class="p-0 m-0 overflow-hidden self-center  ">{technology.name}</h1>
		<p class="p-0 m-0 text-sm text-center">{technology.description}</p>
	</div>
</div>
