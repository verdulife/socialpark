<script>
	import { appState } from '$lib/stores.js';

	function tab(state) {
		$appState = state;
	}
</script>

<nav class="row">
	<ul class="row nowrap">
		<li class="row" on:click={() => tab('leave')}>
			<span class="row fcenter nowrap" class:active={$appState === 'leave'}>
				<img src="/plane.png" alt="Dejo" />
				Dejo
			</span>
		</li>
		<li class="row" on:click={() => tab('search')}>
			<span class="row fcenter nowrap" class:active={$appState === 'search'}>
				<img src="/search.png" alt="Busco" />
				Busco
			</span>
		</li>
	</ul>
</nav>

<style lang="scss">
	nav {
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
	}

	span {
		width: 140px;
		gap: 10px;
		background: rgba(#000, 0.3);
		backdrop-filter: blur(10px);
		color: #fff;
		font-size: 18px;
		font-weight: 400;
		box-shadow: inset -1px -1px 1px 0 rgba(#000, 0.4), inset 1px 1px 1px 0 rgba(#fff, 0.6);
		padding: 16px 24px;
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
