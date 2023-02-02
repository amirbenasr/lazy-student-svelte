<script type="ts">
	import { goto } from '$app/navigation';
	import { format, subDays, formatRelative } from 'date-fns';

	import type { Project } from '$lib/types/project.type';
	import Datetimer from './datetimer.svelte';
	import { menu } from '@skeletonlabs/skeleton';
	import { id } from 'date-fns/esm/locale';
	export let project: Project;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card  bg-slate-300 w-60 h-60 p-4 m-4 relative shadow-xl cursor-pointer">
	<h2 class="card-title ">{project.name}</h2>
	<h3 class="pt-1 pb-3">Mobile app</h3>
	<p class="m-0 p-0">
		Deadline: {format(Date.parse(project.deadline.toString()), 'yyyy-MM-dd hh:mm')}
	</p>

	<div class="status rounded   absolute top-0 right-0 text-red-500 font-2thin text-xs p-1 ">
		Pending
	</div>
	<div class="p-0 m-0 text-xs ">
		Submitted by {project.name} <br />
		{formatRelative(new Date(), Date.parse(project.deadline.toString()))}
	</div>
	<div class="card" data-menu="project-menu">menu</div>
	<!-- <Datetimer id={project.id} date={Date.parse(project.deadline.toString())} /> -->
	<button use:menu={{ menu: 'project-menu-' + project.id, fixed: false }}>
		<a href="#!" class="btn-gig-menu hint--top absolute bottom-5 text-black " data-hint="Gig Actions"><svg class="text-black" xmlns="http://www.w3.org/2000/svg" width="23" height="10" viewBox="0 0 42 10"><path fill="#C6C6C6" d="M5 0c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm16 0c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm16 0c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"></path></svg></a>
	
	</button>

	<div class="menu-tl hidden p-4 h-14 card" data-menu={'project-menu-' + project.id}>
		<ul class="bg-white p-4 rounded-md ">
			<li><a href={'projects/'+project.id+'/edit'}>Edit</a></li>
			<li>Preview</li>
		</ul>
	</div>
</div>
