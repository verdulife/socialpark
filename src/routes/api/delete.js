import { deletePark } from '$lib/database/triggers';

export function POST({ request }) {
	const { park } = request.json();
	const deleted = deletePark(park);

	return {
		status: 200,
		body: {
			deleted
		}
	};
}
