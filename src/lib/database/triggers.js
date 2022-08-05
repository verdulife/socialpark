import Park from '$lib/database/models/park';

export async function addPark(data) {
	const newPark = new Park({ data });
	await newPark.save();

	return newPark;
}

export async function getParks() {
	const parks = await Park.find({});

	return parks;
}
