import { redirect } from '@sveltejs/kit';
import { getOrders, getOrdersByTripId, getOrdersByUserId } from '$lib/server/database/order-model';
import { getTripsByUserId } from '$lib/server/database/trips-model.js';
import type { Order } from '$lib/server/database/drizzle-schemas.js';

export const load = async (event) : Promise<{orders: Order[]}> => {
	const user = event.locals.user;
	let orders: Order[] = [];
    if (!user) {
		redirect(302, '/auth/sign-in');
	}

	// Guests should be able to see their orders only
	if (user.role === 'GUEST') {
		orders = await getOrdersByUserId(user.id)
	}

	// Users should be able to see all orders related to their trips
	if (user.role === 'USER') {
		const trips = await getTripsByUserId(user.id);
		if (!trips || trips.length === 0) {
			return {
				orders: []
			}
		}
		for (const trip of trips) {
			const tripOrders = await getOrdersByTripId(trip.id);
			if (tripOrders) {
				orders = orders.concat(tripOrders);
			}
		}
	}

	// Admins should be able to see all orders
	if (user.role === 'ADMIN') {
			orders = await getOrders()
	}

	if (!orders || orders.length === 0) {
		return {
			orders: []
		}
	}
	return { orders };
};