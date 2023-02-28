<script type="ts">
	import { getUserAvatar } from '$lib/utils/utils';

	export let profile: any;
</script>

<div class="user-details inline-block ">
	<div class="avatar  align-middle ">
		<div class="w-10 rounded-full ">
			<img alt="" src={getUserAvatar(profile)} />
		</div>
	</div>
	<span>{profile.fname}</span>
</div>
