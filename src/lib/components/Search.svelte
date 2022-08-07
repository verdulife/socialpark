<script>
	import { distance, timeAgo } from '$lib/scripts';
	import { geolocation, markers } from '$lib/stores.js';

	let parks = [];
	$: realTime = parks;
	let searchState = 'car';

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
				location: [park.latitude, park.longitude]
			};
		});

		parks = notDone.map((park) => {
			const calc_distance = distance({
				user_latitude: $geolocation[0],
				user_longitude: $geolocation[1],
				park_latitude: park.latitude,
				park_longitude: park.longitude,
				unit: 'm'
			});
			const timeFormat = timeAgo({ user_time: new Date(), park_time: park.timestamp });

			park.distance = calc_distance;

			if (timeFormat === 0) park.timeAgo = 'Menos de 1 minuto';
			else if (timeFormat === 1) park.timeAgo = `Hace ${timeFormat} minuto`;
			else park.timeAgo = `Hace ${timeFormat} minutos`;

			return park;
		});
	}

	getParks();
	setInterval(getParks, 5000);

	function notify() {
		console.log('notify');
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
		{#each realTime as { distance, timeAgo, paid }}
			<li class="xfill">
				<article class="row jbetween acenter xfill nowrap">
					<div class="distance col fcenter">
						<img src="/{paid ? 'paid' : 'park'}.png" alt="Tipo de plaza" />
						<p>{distance}m</p>
					</div>

					<h2 class="grow">{timeAgo}</h2>

					<div class="icon" on:click={notify}>
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
		background: var(--color-sec-light);
		font-weight: 700;
		border-radius: 1em;

		img {
			width: 30px;
			height: 30px;
		}
	}

	h2 {
		font-size: 20px;
		font-weight: 500;
		padding: 0 20px;
	}

	.icon {
		height: 70px;

		img {
			width: 25px;
			height: 25px;
		}
	}
</style>
