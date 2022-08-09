<script>
	import { appState } from '$lib/stores.js';
	import Intro from '$lib/components/Intro.svelte';
	import Leave from '../lib/components/Leave.svelte';
	import Search from '../lib/components/Search.svelte';
</script>

<article class="col acenter fill">
	{#if $appState === 'intro'}
		<Intro />
	{:else if $appState === 'buscar'}
		<Search />
	{:else if $appState === 'anunciar'}
		<Leave />
	{/if}
</article>

<style lang="scss">
	article {
		gap: 20px;
	}
</style>
