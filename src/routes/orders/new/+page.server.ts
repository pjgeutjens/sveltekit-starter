import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate, message } from 'sveltekit-superforms/server';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Actions } from "@sveltejs/kit";
import { orderSchema } from '$lib/config/zod-schemas.js';
import { createOrder, createOrderItem } from '$lib/server/database/order-model.js';
import type { Order, Trip } from '$lib/server/database/drizzle-schemas.js';
import { getTripsByUserId } from '$lib/server/database/trips-model.js';



export const load = async (event) => {
  const user = event.locals.user;
  let trips: Trip[] = [];
  if (!user) {
    redirect(302, '/auth/sign-in');
  }

  // Guests should be able to see their orders only
  trips = await getTripsByUserId(user.id)

  return {
    form: await superValidate(event, orderSchema),
    trips
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, orderSchema);

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
      console.log('creating new order')
      const user = event.locals.user
      if (user) {
        const order = await createOrder({
          id: crypto.randomUUID(),
          tripId: form.data.tripId,
          userEmail: form.data.userEmail,
          currency: form.data.currency,
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        if (order) {
          form.data.items.forEach(async (orderItem) => {
            await createOrderItem(order.id, {
              currency: orderItem.currency,
              description: orderItem.description,
              quantity: orderItem.quantity,
              unitPrice: orderItem.unitPrice
            })
          });
        }

        setFlash({ type: 'success', message: 'Order create successful.' }, event);
      }
    } catch (e) {
      console.error(e);
      return setError(form, 'There was a problem creating the order.');
    }
    console.log('order created successfully');
    return message(form, 'Order created successfully.');
  }
};