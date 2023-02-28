<script type="ts">
	import { formatAgoDate, formatGenericDate, getUserAvatar } from '$lib/utils/utils';
	import Icon from '@iconify/svelte';
	import Avatar from '../avatar.svelte';
	import Project from '../project.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { id, projectDetails } = data;
</script>

<section>
	<div class="flex border-r-2 border-l-2 p-2 ">
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
				<span class=" justify-end">Budget: {projectDetails.budget.toString()}$</span>
			</div>
			<div class="border-b-2 p-2" />
			<div class="details">
				<p class="text-xl font-semibold">Project description</p>
				<span class="p-4">{projectDetails.description}</span>
			</div>
		</div>
		<div class="border-l-2" />
		<div class="w-64 p-2 text-center relative">
			<div class="flex-col">
				<div class="bg-green-300 ">
					<span class="text-bold bg-green-300">{projectDetails.status}</span>
				</div>
				<div class="border-b-2 " />
				<span class="font-semibold text-sm"
					>Deadline: {formatGenericDate(projectDetails.deadline)}</span
				>
				<div class="absolute bottom-0 text-center">
					<button class="btn btn-xs gap-2 rounded-full">
						Submit Proposal
						<Icon icon="material-symbols:add" />
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
<div class="divider" />
<section class="p-4">
	<div class="text-xl font-semibold">Proposals</div>
</section>
