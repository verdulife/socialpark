<script>
	import { appState } from '$lib/stores.js';

	function tab() {
		$appState = $appState === 'anunciar' ? 'buscar' : 'anunciar';
	}
</script>

<nav class="row">
	<span class="row fcenter" on:click={tab}>
		{$appState === 'anunciar' ? 'buscar' : 'anunciar'}
	</span>
</nav>

<style lang="scss">
	nav {
		position: absolute;
		top: -70px;
		left: 20px;
	}

	span {
		width: 115px;
		height: 50px;
		background: rgba(#000, 0.5);
		backdrop-filter: blur(10px);
		color: #fff;
		font-size: 16px;
		font-weight: 500;
		text-align: center;
		text-transform: capitalize;
		border-radius: 1.25em;
		padding: 0 24px;
	}

	li:first-child > span {
		border-radius: 0.75em 0 0 0.75em;
	}

	li:last-child > span {
		border-radius: 0 0.75em 0.75em 0;
	}

	.active {
		background: var(--color-sec);
	}

	img {
		width: 20px;
		height: 20px;
	}
</style>
