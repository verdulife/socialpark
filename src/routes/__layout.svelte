<script>
	import { appState, dragSize, userState } from '$lib/stores';
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import Drag from '$lib/components/Drag.svelte';

	$: if ($appState !== 'search') $dragSize = false;
	if (!$userState.first_visit) $appState = 'leave';
</script>

<main class="fill col">
	{#if $appState !== 'intro'}
		<div class="map-wrapper fill">
			<LeafletMap />
		</div>

		<Tabs />
	{:else}
		<img class="logo" src="/social-park.svg" alt="SocialPark" />
	{/if}

	<div class="content-wrapper xfill" class:expand={$dragSize} class:search={$appState === 'search'}>
		{#if $appState === 'search'}
			<Drag />
		{/if}

		<slot />
	</div>
</main>

<style lang="scss">
	main {
		background: var(--color-sec);
	}

	.logo {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
	}

	.map-wrapper {
		max-height: calc(100% - 300px);
		background: green;
		z-index: 0;
	}

	.content-wrapper {
		position: absolute;
		bottom: 0;
		left: 0;
		min-height: 360px;
		background: #fff;
		border-radius: 2.5em 2.5em 0 0;
		box-shadow: 0 -10px 30px 0 rgba(#000, 0.25);
		padding: 30px;
		padding-top: 0;
		z-index: 1;
		transition: 500ms;
	}

	.search {
		max-height: 360px;
	}

	.expand {
		min-height: 75%;
	}
</style>
