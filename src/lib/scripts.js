export function distance({ park_latitude, user_latitude, park_longitude, user_longitude }) {
	park_longitude = (park_longitude * Math.PI) / 180;
	user_longitude = (user_longitude * Math.PI) / 180;
	park_latitude = (park_latitude * Math.PI) / 180;
	user_latitude = (user_latitude * Math.PI) / 180;

	const dlon = user_longitude - park_longitude;
	const dlat = user_latitude - park_latitude;
	const a =
		Math.pow(Math.sin(dlat / 2), 2) +
		Math.cos(park_latitude) * Math.cos(user_latitude) * Math.pow(Math.sin(dlon / 2), 2);

	const c = 2 * Math.asin(Math.sqrt(a));
	const r = 6371;
	const result = Math.round(c * r * 1000);

	if (result.toString().length > 3) return `${(result / 1000).toFixed(1)}km`;
	return `${result}m`;
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
