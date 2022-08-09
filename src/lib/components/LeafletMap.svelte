<script>
	import { onMount } from 'svelte';
	import { geolocation, userState, markers } from '$lib/stores';
	import 'leaflet/dist/leaflet.css';

	let leaflet, map, userMarker;
	const options = {
		enableHighAccuracy: true,
		maximumAge: 0
	};

	let centered = true;

	const activeMarkers = {};
	$: if (leaflet && $markers) {
		const parkIcon = leaflet.icon({
			iconUrl: 'park.png',
			iconSize: [38, 38]
		});

		$markers.forEach((marker) => {
			if (activeMarkers.length > 0) {
				map.removeLayer(activeMarkers[`marker_${marker._id}`]);
			}

			leaflet.marker(marker.location, { icon: parkIcon }).addTo(map);
			activeMarkers[`marker_${marker._id}`] = marker;
		});
	}

	/* function centerUser() {
		map.setView([$geolocation[0], $geolocation[1]], map.getZoom() || 15);
		centered = true;
	} */

	async function onStart(position) {
		const { latitude, longitude } = position.coords;
		leaflet = leaflet || (await import('leaflet'));
		map = map || leaflet.map('map', { zoomControl: false });

		if (!centered) map.setView([latitude, longitude], map.getZoom() || 15);

		leaflet
			.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			})
			.addTo(map);
	}

	async function onWatch(position) {
		const { latitude, longitude } = position.coords;
		$geolocation = [latitude, longitude];

		if (centered) map.setView([latitude, longitude], map.getZoom() || 15);

		const carIcon = leaflet.icon({
			iconUrl: 'car.png',
			iconSize: [30, 30]
		});

		const motoIcon = leaflet.icon({
			iconUrl: 'moto.png',
			iconSize: [30, 30]
		});

		if (userMarker) map.removeLayer(userMarker);
		userMarker = leaflet
			.marker([latitude, longitude], { icon: $userState.car ? carIcon : motoIcon })
			.addTo(map);
	}

	function onError() {
		alert('No hay cobertura de GPS 🛰');
	}

	onMount(() => {
		navigator.geolocation.getCurrentPosition(onStart, onError, options);
	});

	$: if (leaflet && map) {
		navigator.geolocation.watchPosition(onWatch, onError, { ...options, timeout: 5000 });

		map.on('click', () => {
			centered = false;
		});
	}
</script>

<div id="map" />

<style lang="scss">
	#map {
		height: 100%;
	}
</style>
