import { getParks } from '$lib/database/triggers';

export async function GET() {
	const parks = await getParks();

	return {
		status: 200,
		body: {
			parks
		}
	};
}
