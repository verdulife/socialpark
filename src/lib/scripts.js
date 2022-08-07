export function distance({ park_latitude, user_latitude, park_longitude, user_longitude, unit }) {
	park_longitude = (park_longitude * Math.PI) / 180;
	user_longitude = (user_longitude * Math.PI) / 180;
	park_latitude = (park_latitude * Math.PI) / 180;
	user_latitude = (user_latitude * Math.PI) / 180;

	let dlon = user_longitude - park_longitude;
	let dlat = user_latitude - park_latitude;
	let a =
		Math.pow(Math.sin(dlat / 2), 2) +
		Math.cos(park_latitude) * Math.cos(user_latitude) * Math.pow(Math.sin(dlon / 2), 2);

	let c = 2 * Math.asin(Math.sqrt(a));
	let r = 6371;

	if (unit === 'm') return c * r * 1000;
	return c * r;
}

export function timeAgo({ park_time, user_time }) {
	const park = new Date(park_time);
	const user = new Date(user_time);

	const park_hours = park.getHours();
	const user_hours = user.getHours();
	const park_minutes = park.getMinutes();
	const user_minutes = user.getMinutes();

	if (park_hours !== user_hours) return null;

	const diff = user_minutes - park_minutes;

	if (diff >= 10) return null;

	return diff;
}
