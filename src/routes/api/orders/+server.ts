import type { Order } from '$lib/server/database/drizzle-schemas';
import { createOrder, getOrders, getOrdersByTripId } from '$lib/server/database/order-model';
import { getTripsByUserId } from '$lib/server/database/trips-model';
import { json, type RequestHandler } from '@sveltejs/kit';

export async function GET(event) {
    const user = event.locals.user;
    if (!user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }
    let orders: Order[] | null = [];

    if (user.role === 'ADMIN') {
        console.log('User is admin');
        orders = await getOrders()
    } else {
        console.log('User is not admin');
        const trips = await getTripsByUserId(user.id);
        if (!trips || trips.length === 0) {
            return json({ error: 'No orders found' }, { status: 404 });
        }
        for (const trip of trips) {
            const tripOrders = await getOrdersByTripId(trip.id);
            if (tripOrders) {
                orders = orders.concat(tripOrders);
            }
        }
            
    }
    if (!orders || orders.length === 0) {
        return json({ error: 'No orders found' }, { status: 404 });
    }

    return json({ orders });
}

export const POST: RequestHandler = async ( event ) => {
    const user = event.locals.user;
    if (!user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { request } = event;

    const newOrder: Order = await request.json();
    
    newOrder.id = crypto.randomUUID();
    newOrder.createdAt = new Date(newOrder.createdAt);
    newOrder.updatedAt = new Date(newOrder.updatedAt);
    

    const order = await createOrder(newOrder);
    if (!order) {
        return json({ error: 'Could not create order' }, { status: 400 });
    }
    return json({ order });
}