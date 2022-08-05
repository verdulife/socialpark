<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import 'leaflet/dist/leaflet.css';

	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	onMount(() => {
		if (browser) {
			async function onSuccess(position) {
				const { latitude, longitude } = position.coords;
				const leaflet = await import('leaflet');
				const map = leaflet.map('map', { zoomControl: false }).setView([latitude, longitude], 17);

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
		}
	});
</script>

<div id="map" />

<style>
	#map {
		height: 100%;
	}
</style>
