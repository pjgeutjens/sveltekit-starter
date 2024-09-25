import { eq } from 'drizzle-orm';
import db from '$lib/server/database/drizzle';
import { tripsTable } from '$lib/server/database/drizzle-schemas';
import type { Trip, UpdateTrip } from '$lib/server/database/drizzle-schemas';

export const getTrips = async () => {
	const trips = await db.select().from(tripsTable)
	if (trips.length === 0) {
		return [];
	} else {
		return trips;
	}
};

export const getTripById = async (id: string) => {
	const trip = await db.select().from(tripsTable).where(eq(tripsTable.id, id));
	if (trip.length === 0) {
		return null;
	} else {
		return trip[0];
	}
}

export const getTripsByUserId = async (userId: string) => {
	const trips = await db.select().from(tripsTable).where(eq(tripsTable.userId, userId));
	if (trips.length === 0) {
		return [];
	} else {
		return trips;
	}
}

export const updateOrder = async (id: string, trip: UpdateTrip) => {
	const result = await db.update(tripsTable).set(trip).where(eq(tripsTable.id, id)).returning();
	if (result.length === 0) {
		return [];
	} else {
		return result[0];
	}
};

export const createTrip = async (trip: Trip) => {
	trip.id = crypto.randomUUID();
	trip.createdAt = new Date();
	trip.updatedAt = new Date();
	const result = await db.insert(tripsTable).values(trip).onConflictDoNothing().returning();
	if (result.length === 0) {
		return [];
	} else {
		return result[0];
	}
};
