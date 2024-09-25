import { redirect } from '@sveltejs/kit';
import { getTrips, getTripsByUserId } from '$lib/server/database/trips-model.js';
import type { Trip } from '$lib/server/database/drizzle-schemas.js';

export const load = async (event) => {
	const user = event.locals.user;
	let trips: Trip[] = [];
    if (!user) {
		redirect(302, '/auth/sign-in');
	}
	if (user.role === 'ADMIN') {
		trips = await getTrips()
	}
	if (user.role === 'USER') {
		trips = await getTripsByUserId(user.id)
	}
	return {
        trips
    } 
};