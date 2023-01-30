<script type="ts">
	import type { PageData, PageServerData } from './$types';

	export let data: PageServerData;

	const { publicProfile } = data;

	let selected: Boolean = true;

	function selectOption(e: Event) {
		selected = !selected;
	}
	let file;
	let files: FileList;
	let avatar: string | ArrayBuffer | null;
	function getBase64(image: Blob) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target!.result;
		};
	}
</script>

<div class="flex justify-between border-2 space-x-20 bg-gray-200">
	<section class="w-1/2 border-2 border-cyan-500 pt-5 divide-y-2 p-3 m-0 space-y-5">
		<div id="profile-header" class="relative">
			<div
				class="border-2 border-green-600 rounded-2xl absolute top-0 right-0 m-1 pl-1 pr-1 text-green-500 font-medium"
				id="badge"
			>
				· Online
			</div>

			<div id="profile-details" class="flex flex-col items-center">
				<div id="img" class="rounded-full hover:cursor-pointer relative">
					<label for="input-img" class="hover:cursor-pointer">
						<!-- input hidden file -->
						<input
							type="file"
							name=""
							accept="image/png,image/jpeg"
							id="input-img"
							class="hidden invisible"
							bind:this={file}
							bind:files
							on:change={() => getBase64(files[0])}
						/>
						<img
							src="https://freesvg.org/img/joede--cam-icon.png"
							class="absolute h-40 w-40 rounded-full opacity-0 hover:opacity-50 p-4 duration-300 ease-in-out"
							alt=""
							srcset=""
						/>
						{#if avatar}
							<img id="avatar" src={avatar} alt="avatar" class="h-40 w-40 rounded-full " />
						{:else}
							<img src="https://placeimg.com/80/80/people" alt="" class="h-40 w-40 rounded-full " />
						{/if}
					</label>
				</div>

				<span class="font-semibold text-xl">{publicProfile.fname + ' ' + publicProfile.lname}</span>
			</div>
		</div>
		<div id="profile-details">
			<div id="from" class="flex justify-between p-2">
				<p class="font-light">From</p>
				<p class="font-medium">Tunisia</p>
			</div>
			<div id="since" class="flex justify-between p-2">
				<p class="font-light">Member Since</p>
				<p class="font-medium">2022-01-04</p>
			</div>
		</div>
	</section>
	<section class="w-2/3 border-2 border-cyan-500">
		<div id="projects-tab" class="h-12 p-2">
			<ul class="flex space-x-4 ">
				<li class="hover:cursor-pointer ">Active projects</li>
				<li class="hover:cursor-pointer ">Paused</li>
			</ul>
		</div>
	</section>
</div>
