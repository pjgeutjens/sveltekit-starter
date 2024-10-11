CREATE TABLE IF NOT EXISTS "order_items" (
	"order_id" text NOT NULL,
	"description" text NOT NULL,
	"currency" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "user_id" TO "user_email";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "short_id" SET DEFAULT 'f0fXYXpGd';--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "product_description";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "product_price";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "quantity";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
