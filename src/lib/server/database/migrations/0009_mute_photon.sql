ALTER TABLE "orders" ALTER COLUMN "short_id" SET DEFAULT 'MWu1N4uuV';--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "total_price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "pct_cod" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_email_users_email_fk" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
