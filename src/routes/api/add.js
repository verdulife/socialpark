import '$lib/database/connection';
import { addPark } from '$lib/database/triggers';

/* async function getStreet(latitude, longitude) {
	const req = await fetch(
		`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
	);

	const res = await req.json();
	const { road, house_number } = res.address;

	return { road, house_number };
} */

export async function POST({ request }) {
	const data = await request.json();
	/* const { road, house_number } = await getStreet(data.latitude, data.longitude); */
	/* console.log(road, house_number); */

	data['street'] = 'Comming soon' /* `${road} ${house_number}` */;

	const newPark = await addPark(data);

	return {
		status: 200,
		body: {
			newPark
		}
	};
}
