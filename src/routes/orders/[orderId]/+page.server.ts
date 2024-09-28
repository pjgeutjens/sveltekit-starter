import { redirect } from '@sveltejs/kit';
import { getTripById } from '$lib/server/database/trips-model.js';
import { getOrderById } from '$lib/server/database/order-model.js';

export const load = async ({params}) => {
	const order = await getOrderById(params.orderId);
	if (!order) {
		redirect(302, '/orders');
	}
	const trip = await getTripById(order.tripId);
	return {
		order,
		trip
	}
};