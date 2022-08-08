<script>
	import { onMount } from 'svelte';
	import { geolocation, appState, markers } from '$lib/stores';
	import 'leaflet/dist/leaflet.css';

	let leaflet, map;
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function resize() {
		map.invalidateSize();
	}

	$: if (map && $appState) {
		setTimeout(resize, 0);
	}

	$: if (leaflet && $markers.length > 0) {
		const parkIcon = L.icon({
			iconUrl: 'park.png',
			iconSize: [38, 38]
		});

		const paidIcon = L.icon({
			iconUrl: 'paid.png',
			iconSize: [38, 38]
		});

		$markers.forEach((marker) => {
			if (marker.paid) {
				leaflet.marker(marker.location, { icon: paidIcon }).addTo(map);
			} else {
				leaflet.marker(marker.location, { icon: parkIcon }).addTo(map);
			}
		});
	}

	onMount(() => {
		async function onSuccess(position) {
			const { latitude, longitude } = position.coords;
			leaflet = await import('leaflet');
			map = leaflet.map('map', { zoomControl: false }).setView([latitude, longitude], 15);

			$geolocation = [latitude, longitude];

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			const carIcon = L.icon({
				iconUrl: 'car.png',
				iconSize: [38, 38]
			});

			leaflet.marker([latitude, longitude], { icon: carIcon }).addTo(map);
		}

		function onError() {
			alert('Unable to retrieve your location');
		}

		navigator.geolocation.watchPosition(onSuccess, onError, options);
	});
</script>

<div id="map" />

<style>
	#map {
		height: 100%;
	}
</style>
