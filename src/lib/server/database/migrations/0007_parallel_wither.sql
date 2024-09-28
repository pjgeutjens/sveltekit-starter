ALTER TABLE "orders" ADD COLUMN "short_id" text DEFAULT 'hmkdYnRKH' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_short_id_unique" UNIQUE("short_id");