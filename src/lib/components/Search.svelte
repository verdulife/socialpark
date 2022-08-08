<script>
	import { distance, timeAgo } from '$lib/scripts';
	import { geolocation, markers } from '$lib/stores.js';

	let parks = [];
	$: realTime = parks;
	let searchState = 'car';

	$: console.log(parks);

	async function getStreet() {
		const req = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${$geolocation[0]}&lon=${$geolocation[1]}`
		);

		const res = await req.json();
		const { house_number, road } = res.address;

		return { house_number, road };
	}

	async function getParks() {
		const req = await fetch('/api/get');

		if (!req.ok) {
			alert('Something went wrong. Please try again.');
			return;
		}

		const res = await req.json();

		const notDone = res.parks.filter(
			(park) => timeAgo({ user_time: new Date(), park_time: park.timestamp }) !== null
		);

		$markers = notDone.map((park) => {
			return {
				id: park._id,
				location: [park.latitude, park.longitude],
				paid: park.paid
			};
		});

		parks = notDone.map((park) => {
			const calc_distance = distance({
				user_latitude: $geolocation[0],
				user_longitude: $geolocation[1],
				park_latitude: park.latitude,
				park_longitude: park.longitude
			});
			const timeFormat = timeAgo({ user_time: new Date(), park_time: park.timestamp });

			park.distance = calc_distance;

			if (timeFormat === 0) park.timeAgo = 'Menos de 1 minuto';
			else if (timeFormat === 1) park.timeAgo = `Hace ${timeFormat} minuto`;
			else park.timeAgo = `Hace ${timeFormat} minutos`;

			return park;
		});
	}

	getStreet();

	getParks();
	setInterval(getParks, 5000);

	async function notify(_id) {
		const check = confirm('¿Ya esta ocupada?');

		console.log(_id);

		if (check) {
			const req = await fetch('/api/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ _id })
			});

			if (!req.ok) {
				alert('Something went wrong. Please try again.');
				return;
			}

			alert('Gracias por su colaboración');
		}
	}
</script>

<div class="topbar row jbetween acenter xfill">
	<div class="col">
		<h1>Cerca de ti</h1>
		<p>{parks.length} posibles plazas libres</p>
	</div>

	<div class="type row fcenter">
		<img class="fill" src="/{searchState === 'car' ? 'car' : 'moto'}.png" alt="Tipo de plaza" />
	</div>
</div>

<div class="scroll">
	<ul class="col xfill">
		{#each realTime as { _id, distance, timeAgo, paid, street }}
			<li class="xfill">
				<article class="row jbetween acenter xfill nowrap">
					<div class="distance col fcenter">
						<img src="/{paid ? 'paid' : 'park'}.png" alt="Tipo de plaza" />
						<p>{distance}km</p>
					</div>

					<div class="info col grow">
						<h2>{timeAgo}</h2>
						<p>{street}</p>
					</div>

					<div class="icon" on:click={() => notify(_id)}>
						<img src="/plane.png" alt="Action" />
					</div>
				</article>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	h1 {
		font-size: 26px;
		font-weight: 700;
		margin-top: 30px;
	}

	p {
		color: var(--color-grey);
	}

	.type {
		background: #ddd;
		width: 40px;
		height: 40px;
		border-radius: 0.5em;
		padding: 8px;
	}

	.scroll {
		width: calc(100% + 60px);
		margin-bottom: -30px;
		padding: 30px;
	}

	ul {
		gap: 20px;
	}

	.distance {
		min-width: 70px;
		height: 70px;
		gap: 4px;
		background: var(--color-sec-light);
		font-weight: 700;
		border-radius: 1em;

		img {
			width: 30px;
			height: 30px;
		}

		p {
			color: #fff;
			line-height: 1;
		}
	}

	.info {
		padding: 0 20px;
	}

	h2 {
		font-size: 20px;
		font-weight: 500;
	}

	.icon {
		height: 70px;

		img {
			width: 25px;
			height: 25px;
		}
	}
</style>
