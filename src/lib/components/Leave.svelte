<script>
	import { geolocation, userState } from '$lib/stores.js';

	let vehicle = $userState.car;
	let park = $userState.paid;

	async function getStreet(latitude, longitude) {
		const req = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
		);

		const res = await req.json();
		const { road, house_number } = res.address;

		return { road, house_number };
	}

	async function leave() {
		const { road, house_number } = await getStreet($geolocation[0], $geolocation[1]);
		console.log(road, house_number);

		const req = await fetch('/api/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				latitude: $geolocation[0],
				longitude: $geolocation[1],
				car: vehicle,
				paid: park,
				timestamp: new Date(),
				street: `${road} ${house_number}`
			})
		});

		if (!req.ok) {
			alert('Something went wrong. Please try again.');
			return;
		}

		$userState.car = vehicle;
		$userState.paid = park;
		alert('Successfully added your leave.');
	}
</script>

<form class="col acenter xfill" on:submit|preventDefault={leave}>
	<h1 class="xfill">¿Dejas un sitio?</h1>

	<p class="xfill">Mi vehiculo es</p>

	<div class="group row jcenter xfill">
		<label for="car">
			<span class:selected={vehicle === true}>
				<img src="/car.png" alt="car" />
			</span>

			<input type="radio" id="car" name="vehicle" value={true} bind:group={vehicle} />
		</label>

		<label for="moto" class:selected={vehicle === false}>
			<span>
				<img src="/moto.png" alt="moto" />
			</span>

			<input type="radio" id="moto" name="vehicle" value={false} bind:group={vehicle} />
		</label>
	</div>

	<p class="xfill">El tipo de plaza es</p>

	<div class="group row jcenter xfill">
		<label for="free">
			<span class:selected={park === false}>
				<img src="/park.png" alt="free" />
			</span>

			<input type="radio" id="free" name="park" value={false} bind:group={park} />
		</label>

		<label for="paid">
			<span class:selected={park === true}>
				<img src="/paid.png" alt="paid" />
			</span>

			<input type="radio" id="paid" name="park" value={true} bind:group={park} />
		</label>
	</div>

	<button class="sec round">Confirmar</button>
</form>

<style lang="scss">
	form {
		gap: 20px;
		margin-top: 30px;
	}

	h1 {
		font-size: 26px;
		font-weight: 700;
	}

	p {
		color: var(--color-grey);
	}

	.group {
		gap: 100px;
	}

	input[type='radio'] {
		display: none;
	}

	span {
		display: flex;
		border-radius: 1em;
		padding: 10px;
		transition: 200ms;
	}

	.selected {
		background: var(--color-sec);
		box-shadow: inset -1px -1px 2px 0 rgba(#000, 0.3), inset 1px 1px 2px 0 rgba(#fff, 0.6);
	}

	button {
		width: 70%;
		font-weight: bold;
		color: #fff;
		margin-top: 20px;
	}
</style>
