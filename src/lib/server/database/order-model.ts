import { eq } from 'drizzle-orm';
import db from '$lib/server/database/drizzle';
import { ordersTable } from '$lib/server/database/drizzle-schemas';
import type { Order, UpdateOrder } from '$lib/server/database/drizzle-schemas';

export const getOrderByUserEmail = async (email: string) => {
	const order = await db.select().from(ordersTable).where(eq(ordersTable.userEmail, email));
	if (order.length === 0) {
		return null;
	} else {
		return order[0];
	}
};

export const getOrdersByTripId = async (tripId: string) => {
	const orders = await db.select().from(ordersTable).where(eq(ordersTable.tripId, tripId));
	if (orders.length === 0) {
		return null;
	} else {
		return orders;
	}
};


export const updateOrder = async (id: string, order: UpdateOrder) => {
	const result = await db.update(ordersTable).set(order).where(eq(ordersTable.id, id)).returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};

export const createOrder = async (order: Order) => {
	const result = await db.insert(ordersTable).values(order).onConflictDoNothing().returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};
