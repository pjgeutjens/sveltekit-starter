DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('received', 'confirmed', 'payment_info_sent', 'payment_received', 'in_transit', 'arrived', 'shipped', 'delivered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" "status" DEFAULT 'received' NOT NULL;