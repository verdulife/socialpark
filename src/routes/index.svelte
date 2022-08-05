<script>
	import Intro from '$lib/components/Intro.svelte';
	import Leave from '../lib/components/Leave.svelte';
	import { appState } from '$lib/stores.js';
</script>

{#if $appState === 'intro'}
	<div class="logo-wrapper col acenter fill" />
{/if}

<article class="col acenter fill">
	{#if $appState === 'intro'}
		<Intro />
	{/if}

	{#if $appState === 'leave'}
		<Leave />
	{/if}
</article>

<style lang="scss">
	.logo-wrapper {
		position: absolute;
		inset: 0;
		background: rgba(#000, 0.8);
		z-index: 0;
	}

	article {
		position: sticky;
		bottom: 0;
		gap: 20px;
		background: #fff;
		border-radius: 2.5em 2.5em 0 0;
		box-shadow: 0 -10px 30px 0 rgba(#000, 0.25);
		padding: 30px;
		z-index: 1;
	}
</style>
