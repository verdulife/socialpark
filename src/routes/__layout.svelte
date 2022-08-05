<script>
	import LeafletMap from '$lib/components/LeafletMap.svelte';
</script>

<main class="fill col">
	<div class="map-wrapper xfill grow">
		<LeafletMap />
	</div>

	<div class="content-wrapper xfill grow">
		<slot />
	</div>
</main>

<style lang="scss">
	.map-wrapper {
		background: green;
		z-index: 0;
	}

	.content-wrapper {
		z-index: 1;
	}
</style>
