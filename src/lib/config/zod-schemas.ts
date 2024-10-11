import { z } from 'zod';

export const userSchema = z.object({
	firstName: z
		.string({ required_error: 'First Name is required' })
		.min(1, { message: 'First Name is required' })
		.trim(),
	lastName: z
		.string({ required_error: 'Last Name is required' })
		.min(1, { message: 'Last Name is required' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	confirmPassword: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	//terms: z.boolean({ required_error: 'You must accept the terms and privacy policy' }),
	role: z
		.enum(['USER', 'PREMIUM', 'ADMIN'], { required_error: 'You must have a role' })
		.default('USER'),
	verified: z.boolean().default(false),
	terms: z.literal<boolean>(true, {
		errorMap: () => ({ message: "You must accept the terms & privacy policy" }),
	}),
	token: z.string().optional(),
	receiveEmail: z.boolean().default(true),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});

export type UserSchema = typeof userSchema;

export const userUpdatePasswordSchema = userSchema
	.pick({ password: true, confirmPassword: true })
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

	export type UserUpdatePasswordSchema = typeof userUpdatePasswordSchema;

	export const tripSchema = z.object({
		origin: z.string().trim(),
		destination: z
		.string({ required_error: 'Destination is required' })
		.min(1, { message: 'Destination is required' })
		.trim(),
		arrivalDate: z.string().date(),
		orderDeadline: z.string().date(),
	})

	export type TripSchema = typeof tripSchema;

	export const orderItemSchema = z.object({
		quantity: z
		.number()
		.gte(1, {message: 'Order size should be at least 1'})
		.lte(1, {message: 'Order size should be at least 1'}),
		currency: z
		.string({ required_error: 'Currency is required' })
		.min(1, { message: 'Currency is required' }),
		unitPrice: z
		.number()
		.gt(0, {message: 'Unit price should be a positive number'}),
		description: z
		.string({ required_error: 'Description is required' })
		.min(1, { message: 'Description is required' }),
	})

	export type OrderItemSchema = typeof orderItemSchema

	export const orderSchema = z.object({
		tripId: z
		.string({ required_error: 'Trip ID is required' })
		.min(1, { message: 'Trip ID is required' }),
		userEmail: z.string().email().min(5),
		status: z.string().min(1, { message: 'Status is required' }),
		items: z.array(orderItemSchema),
		totalCost: z.number(),
		currency: z
		.string({ required_error: 'Currency is required' })
		.min(1, { message: 'Currency is required' }),
		codPct: z.number().gte(0).lte(100)
	})

	export type OrderSchema = typeof orderSchema;

