import { eq } from 'drizzle-orm';
import db from '$lib/server/database/drizzle';
import { ordersTable } from '$lib/server/database/drizzle-schemas';
import type { Order, UpdateOrder } from '$lib/server/database/drizzle-schemas';

export const getOrders = async () => {
	const orders = await db.select().from(ordersTable);
	if (orders.length === 0) {
		return [];
	} else {
		return orders;
	}
};

export const getOrderById = async (id: string) => {
	const order = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
	if (order.length === 0) {
		return null;
	} else {
		return order[0];
	}
}

export const getOrdersByUserId = async (userId: string) : Promise<Order[]>  => {
	const orders = await db.select().from(ordersTable).where(eq(ordersTable.userId, userId));
	if (orders.length === 0) {
		return [];
	} else {
		return orders;
	}
};

export const getOrdersByTripId = async (tripId: string): Promise<Order[]>  => {
	const orders = await db.select().from(ordersTable).where(eq(ordersTable.tripId, tripId));
	if (orders.length === 0) {
		return [];
	} else {
		return orders;
	}
}

export const getOrdersByOrderId = async (tripId: string): Promise<Order[]>  => {
	const orders = await db.select().from(ordersTable).where(eq(ordersTable.tripId, tripId));
	if (orders.length === 0) {
		return [];
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
	order.id = crypto.randomUUID();
	order.createdAt = new Date();
	order.updatedAt = new Date();
	const result = await db.insert(ordersTable).values(order).onConflictDoNothing().returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};
