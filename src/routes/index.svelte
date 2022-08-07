<script>
	import Intro from '$lib/components/Intro.svelte';
	import Tabs from '../lib/components/Tabs.svelte';
	import Drag from '$lib/components/Drag.svelte';
	import Leave from '../lib/components/Leave.svelte';
	import Search from '../lib/components/Search.svelte';
	import { appState } from '$lib/stores.js';
</script>

{#if $appState === 'intro'}
	<div class="logo-wrapper col acenter fill" />
{/if}

{#if $appState !== 'intro'}
	<Tabs />
{/if}

<article class="col acenter fill">
	{#if $appState === 'intro'}
		<Intro />
	{:else}
		<Drag />
	{/if}

	{#if $appState === 'leave'}
		<Leave />
	{/if}

	{#if $appState === 'search'}
		<Search />
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
		height: auto;
		gap: 20px;
		background: #fff;
		border-radius: 2.5em 2.5em 0 0;
		box-shadow: 0 -10px 30px 0 rgba(#000, 0.25);
		padding: 30px;
		padding-top: 10px;
		z-index: 1;
	}
</style>
