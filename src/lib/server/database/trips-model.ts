import { eq } from 'drizzle-orm';
import db from '$lib/server/database/drizzle';
import { tripsTable } from '$lib/server/database/drizzle-schemas';
import type { Trip, UpdateTrip } from '$lib/server/database/drizzle-schemas';

export const getTrips = async () => {
	const trips = await db.select().from(tripsTable)
	if (trips.length === 0) {
		return null;
	} else {
		return trips;
	}
};

export const getTripsByUserId = async (userId: string) => {
	const trips = await db.select().from(tripsTable).where(eq(tripsTable.userId, userId));
	if (trips.length === 0) {
		return null;
	} else {
		return trips;
	}
}

export const updateOrder = async (id: string, trip: UpdateTrip) => {
	const result = await db.update(tripsTable).set(trip).where(eq(tripsTable.id, id)).returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};

export const createTrip = async (trip: Trip) => {
	const result = await db.insert(tripsTable).values(trip).onConflictDoNothing().returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};
