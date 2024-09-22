DROP TABLE "products";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "product_id" TO "product_description";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "product_price" integer NOT NULL;