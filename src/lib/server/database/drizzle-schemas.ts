// import { desc } from 'drizzle-orm';
import { pgTable, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

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
	endDate: timestamp('end_date', {
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


export const ordersTable = pgTable('orders', {
	id: text('id').notNull().primaryKey(),
	tripId: text('trip_id')
		.notNull()
		.references(() => tripsTable.id),
	userEmail: text('user_email').notNull(),
	productDescription: text('product_description')
		.notNull(),
	productPrice: integer('product_price').notNull(),
	quantity: integer('quantity').notNull(),
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
