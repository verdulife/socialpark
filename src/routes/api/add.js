import '$lib/database/connection';
import { addPark } from '$lib/database/triggers';

export async function POST({ request }) {
	const data = await request.json();

	const newPark = await addPark(data);

	return {
		status: 200,
		body: {
			newPark
		}
	};
}
