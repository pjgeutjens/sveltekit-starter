// import { desc } from 'drizzle-orm';
import { generateRandomString } from 'oslo/crypto';
import { pgTable, text, pgEnum, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// order status enum

// received : order was received
// confirmed : order was confirmed by user and delivery info provided
// payment_info_sent : payment info was sent to user
// payment_received : payment was received
// in_transit : order is in transit to destination
// arrived : order arrived at destination
// shipped : order was shipped to user
// delivered : order was delivered to user

export const orderStatusEnum = pgEnum('status', [
	'received',
	'confirmed',
	'payment_info_sent',
	'payment_received',
	'in_transit',
	'arrived',
	'shipped',
	'delivered'
]);

export const userTable = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	provider: text('provider').notNull().default('email'),
	providerId: text('provider_id').notNull().default(''),
	email: text('email').notNull().unique(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	role: text('role').notNull().default('USER'),
	verified: boolean('verified').notNull().default(false),
	receiveEmail: boolean('receive_email').notNull().default(true),
	password: text('password'),
	token: text('token').unique(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const sessionTable = pgTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const tripsTable = pgTable('trips', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	origin: text('origin').notNull(),
	destination: text('destination').notNull(),
	orderDeadline: timestamp('order_deadline', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	arrivalDate: timestamp('arrival_date', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

const shortIdLength = 9;

export function generateShortId(): string {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < shortIdLength; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result;
}

export const ordersTable = pgTable('orders', {
	id: text('id').notNull().primaryKey(),
	shortId: text('short_id').notNull().default(generateShortId()).unique(),
	tripId: text('trip_id')
		.notNull()
		.references(() => tripsTable.id),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	productDescription: text('product_description').notNull(),
	productPrice: integer('product_price').notNull(),
	quantity: integer('quantity').notNull(),
	status: orderStatusEnum('status').notNull().default('received'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = typeof userTable.$inferInsert;
export type UpdateUser = Partial<typeof userTable.$inferInsert>;
export type Session = typeof sessionTable.$inferInsert;
export type Trip = typeof tripsTable.$inferInsert;
export type UpdateTrip = Partial<typeof tripsTable.$inferInsert>;
export type Order = typeof ordersTable.$inferInsert;
export type UpdateOrder = Partial<typeof ordersTable.$inferInsert>;
