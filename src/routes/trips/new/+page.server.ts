import { fail } from '@sveltejs/kit';
import { setError, superValidate, message } from 'sveltekit-superforms/server';
import { setFlash } from 'sveltekit-flash-message/server';
import type { Actions } from "@sveltejs/kit";
import { tripSchema } from '$lib/config/zod-schemas.js';
import { createTrip } from '$lib/server/database/trips-model.js';
import type { Trip } from '$lib/server/database/drizzle-schemas.js';


 
export const load = async (event) => {
  return {
    form: await superValidate(event, tripSchema),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, tripSchema);
    console.log("hi")

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    try {
        console.log('creating new trip')
        const user = event.locals.user
        if (user) {
            await createTrip({
                id: crypto.randomUUID(),
                userId: user.id,
                origin: form.data.origin,
                destination: form.data.destination,
                arrivalDate: new Date(form.data.arrivalDate),
                createdAt: new Date(),
                updatedAt: new Date(),
                orderDeadline: new Date(form.data.orderDeadline)
            })
            setFlash({ type: 'success', message: 'Trip create successful.' }, event);
        }
    } catch (e) {
        console.error(e);
        return setError(form, 'There was a problem creating the trip.');
    }
    console.log('trip created successfully');
    return message(form, 'Trip created successfully.');
  }
};