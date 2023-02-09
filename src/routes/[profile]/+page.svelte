<script type="ts">
	import { formatGenericDate, formatReadableDate } from '$lib/utils/utils';
	import type { PageData, PageServerData } from './$types';

	export let data: PageServerData;

	const { publicProfile, profile } = data;

	let selected: Boolean = true;
	let editing: Boolean = false;

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

<div class="flex justify-between  space-x-20 ">
	<section class="w-1/2 border-2  y rounded-xl border-primary pt-5 divide-y-2 p-3 m-0 space-y-5 ">
		<form method="POST" action="?/update" enctype="multipart/form-data">
			<div id="profile-header" class="relative p-4">
				<div
					class="border-2 border-green-600 rounded-xl absolute top-0 right-0 m-1 pl-1 pr-1 text-green-500 font-medium"
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
								name="file"
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
								<img src={profile.avatar} alt="" class="h-40 w-40 rounded-full " />
							{/if}
						</label>
					</div>

					<span class="font-semibold text-xl"
						>{publicProfile.fname + ' ' + publicProfile.lname}</span
					>
					<span class="font-light">{publicProfile.user.username}</span>
				</div>
			</div>

			{#if !editing}
				<div id="profile-details">
					<div class="text-base font-semibold p-2">{publicProfile.bio}</div>
					<div id="from" class="flex justify-between p-2">
						<p class="font-light">From</p>
						<p class="font-medium">Tunisia</p>
					</div>
					<div id="since" class="flex justify-between p-2">
						<p class="font-light">Member Since</p>
						<p class="font-medium">{formatReadableDate(profile.createdAt)}</p>
					</div>
				</div>
				<button type="submit" on:click={() => (editing = true)} class="btn w-full btn-sm"
					>Edit profile</button
				>
			{:else}
				<div class="xl:input-group ">
					<div class="">
						<label for="lname" class="label-text">Last name</label>
						<input type="text" name="lname" id="lname" value={publicProfile.lname} />
					</div>
					<div class="">
						<label for="fname" class="label-text">First name</label>
						<input type="text" name="fname" id="fname" value={publicProfile.fname} />
					</div>
				</div>
				<div class="bio">
					<label for="bio" class="label block">Bio</label>
					<textarea class="textarea w-full " value={publicProfile.bio} name="bio" id="bio" />
				</div>

				<div class="flex justify-start space-x-4 p-2">
					<button class="btn btn-xs btn-primary">Confirm</button>
					<button type="submit" class="btn btn-xs " on:click={() => (editing = false)}
						>Cancel</button
					>
				</div>
			{/if}
		</form>
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
