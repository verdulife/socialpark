import { deletePark } from '$lib/database/triggers';

export async function POST({ request }) {
	const _id = await request.json();
	const deleted = await deletePark(_id);

	return {
		status: 200,
		body: {
			deleted
		}
	};
}
