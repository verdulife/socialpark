<script>
	import { dragSize } from '$lib/stores.js';

	function drag() {
		$dragSize = !$dragSize;
	}
</script>

<div class="outer row fcenter xfill" on:click={drag}>
	<div class="inner row" />
</div>

<style lang="scss">
	.outer {
		padding: 10px;
		z-index: 1;
	}
	.inner {
		width: 60px;
		height: 6px;
		background: var(--color-grey-light);
		border-radius: 5px;
	}
</style>
