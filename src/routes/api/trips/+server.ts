import type { Trip } from '$lib/server/database/drizzle-schemas';
import { createTrip, getTrips, getTripsByUserId } from '$lib/server/database/trips-model';
import { json, type RequestHandler } from '@sveltejs/kit';

export async function GET(event) {
    const user = event.locals.user;
    if (!user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }
    let trips;
    if (user.role === 'ADMIN') {
        console.log('User is admin');
        trips = await getTrips()
    } else {
        console.log('User is not admin');
        trips = await getTripsByUserId(user.id);
    }
    if (!trips || trips.length === 0) {
        return json({ error: 'No trips found' }, { status: 404 });
    }

    return json({ trips });
}

export const POST: RequestHandler = async ( event ) => {
    const user = event.locals.user;
    if (!user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { request } = event;

    const newTrip: Trip = await request.json();
    
    newTrip.id = crypto.randomUUID();
    newTrip.userId = user.id;
    newTrip.createdAt = new Date();
    newTrip.updatedAt = new Date();
    newTrip.arrivalDate = new Date(newTrip.arrivalDate);
    newTrip.orderDeadline = new Date(newTrip.orderDeadline);

    const trip = await createTrip(newTrip);
    if (!trip) {
        return json({ error: 'Could not create trip' }, { status: 400 });
    }
    return json({ trip });
}