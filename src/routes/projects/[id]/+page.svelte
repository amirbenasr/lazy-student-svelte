<script type="ts">
	import { formatAgoDate, getUserAvatar } from '$lib/utils/utils';
	import Avatar from '../avatar.svelte';
	import Project from '../project.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { id, projectDetails } = data;
</script>

<div class="flex border-r-2 border-l-2 ">
	<div class="flex flex-1 flex-grow  flex-col p-2">
		<span class="font-bold">{projectDetails?.title?.toUpperCase()}</span>
		<span class="font-semibold text-sm"
			>Technology: <span class="text-sm font-light">
				{projectDetails.type.toLowerCase()},{projectDetails.technology.toLowerCase()}</span
			></span
		>
		<div class="divider w-full flex-grow" />
		<div class="flex justify-between align-middle items-center">
			<span class="inline-block align-middle ">
				<Avatar profile={projectDetails.createdBy.Profile} /> Created this project
				<span class="text-md font-light">
					{formatAgoDate(projectDetails.createdAt)}
				</span>
			</span>
			<span class=" justify-end">Budget: $20 to $100</span>
		</div>
		<div class="border-b-2 p-2" />
	</div>
	<div class="border-l-2" />
	<div class="flex-shrink-0 p-2">
		<div class="flex-col">
			<span class="text-bold">{projectDetails.status}</span>
			<div class="border-b-2 " />
			<span>Deadline : </span>
		</div>
	</div>
</div>
