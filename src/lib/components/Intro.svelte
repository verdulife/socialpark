<script>
	import { appState } from '$lib/stores.js';

	function start() {
		$appState = 'leave';
	}
</script>

<img src="/social-park.svg" alt="Social Park logotype" class="logo" />

<h1 class="xfill">Aparcar no<br />es facil 😭</h1>

<h3 class="xfill">Pero con un pequeño gesto puede serlo 🤔</h3>

<p class="xfill">
	Cada vez que dejes libre una plaza, entras en SocialPark y lo anuncias. Compartiendo esta app con
	tus amigos y familiares, podremos encontrar de forma rápida y senzilla la tan deseada plaza de
	aparcamiento.
</p>

<button class="pri round big" on:click={start}>Emepezemos</button>

<style lang="scss">
	.logo {
		position: absolute;
		top: -40px;
		transform: translateY(-100%);
    height: 15vh;
    max-height: 117px;
		object-fit: contain;
	}

	h1 {
		font-size: 2.5em;
		font-weight: 700;
		margin-top: 20px;
	}

	h3 {
		font-weight: 500;
	}

	p {
		font-weight: 400;
	}

	button {
		width: 70%;
		font-weight: bold;
		color: #fff;
    margin-top: auto;
	}
</style>
