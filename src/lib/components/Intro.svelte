<script>
	import { userState, appState } from '$lib/stores.js';

	function start() {
		$userState.first_visit = false;
		$appState = 'leave';
	}
</script>

<h1 class="xfill">Aparcar no<br />es facil 😭</h1>

<h3 class="xfill">Pero con un pequeño gesto puede serlo 🤔</h3>

<p class="xfill">
	Cada vez que dejes libre una plaza, entras en SocialPark y lo anuncias. Compartiendo esta app con
	tus amigos y familiares, podremos encontrar de forma rápida y senzilla la tan deseada plaza de
	aparcamiento.
</p>

<button class="pri round big" on:click={start}>Emepezemos</button>

<style lang="scss">
	h1 {
		font-size: 2.5em;
		font-weight: 700;
		margin-top: 30px;
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
