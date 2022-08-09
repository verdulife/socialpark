<script>
	import { appState, dragSize, userState } from '$lib/stores';
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import Center from '$lib/components/Center.svelte';
	import Drag from '$lib/components/Drag.svelte';

	$: if ($appState !== 'search') $dragSize = false;
	if (!$userState.first_visit) $appState = 'buscar';
</script>

<main class="fill col">
	{#if $appState !== 'intro'}
		<div class="map-wrapper fill">
			<LeafletMap />
		</div>
	{:else}
		<img class="logo" src="/social-park.svg" alt="SocialPark" />
	{/if}

	<div class="content-wrapper xfill" class:expand={$dragSize} class:search={$appState === 'buscar'}>
		<Tabs />
		<Center />

		{#if $appState === 'buscar'}
			<Drag />
		{/if}

		<slot />
	</div>
</main>

<style lang="scss">
	:global {
		body {
			background: #000;
		}
	}

	:root {
		--color-sec: #0081a8;
	}

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
		position: absolute;
		max-height: calc(100% - 300px);
		background: var(--color-sec);
		z-index: 0;

		&:after {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--color-sec);
			mix-blend-mode: color;
			z-index: 998;
		}
	}

	.content-wrapper {
		position: absolute;
		bottom: 0;
		left: 0;
		min-height: 360px;
		background: #000;
		box-shadow: 0 -10px 30px 0 rgba(#000, 0.25);
		padding: 30px;
		padding-top: 0;
		z-index: 1;
		transition: 500ms;

		&:before {
			content: '';
			position: absolute;
			top: -5em;
			left: 0;
			width: 2.5em;
			height: 5em;
			background: transparent;
			border-bottom-left-radius: 2.5em;
			box-shadow: -1px 2.5em 0 0 #000;
			z-index: 998;
		}

		&:after {
			content: '';
			position: absolute;
			top: -5em;
			right: 0;
			width: 2.5em;
			height: 5em;
			background: transparent;
			border-bottom-right-radius: 2.5em;
			box-shadow: 1px 2.5em 0 0 #000;
			z-index: 998;
		}
	}

	.search {
		max-height: 360px;
	}

	.expand {
		min-height: 75%;
	}
</style>
