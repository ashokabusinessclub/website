import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "media" (
      "id" serial PRIMARY KEY NOT NULL,
      "alt" varchar,
      "caption" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "url" varchar,
      "thumbnail_u_r_l" varchar,
      "filename" varchar,
      "mime_type" varchar,
      "filesize" numeric,
      "width" numeric,
      "height" numeric,
      "focal_x" numeric,
      "focal_y" numeric,
      "sizes_thumbnail_url" varchar,
      "sizes_thumbnail_width" numeric,
      "sizes_thumbnail_height" numeric,
      "sizes_thumbnail_mime_type" varchar,
      "sizes_thumbnail_filesize" numeric,
      "sizes_thumbnail_filename" varchar,
      "sizes_card_url" varchar,
      "sizes_card_width" numeric,
      "sizes_card_height" numeric,
      "sizes_card_mime_type" varchar,
      "sizes_card_filesize" numeric,
      "sizes_card_filename" varchar
    );

    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "cover_image_id" integer;
    ALTER TABLE "abr_items" ADD COLUMN IF NOT EXISTS "cover_image_id" integer;
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "logo_image_id" integer;
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "logo_dark_image_id" integer;

    CREATE TABLE IF NOT EXISTS "abr_items_images" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL,
      "caption" varchar,
      "alt" varchar
    );

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'events_cover_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "events"
          ADD CONSTRAINT "events_cover_image_id_media_id_fk"
          FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'abr_items_cover_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "abr_items"
          ADD CONSTRAINT "abr_items_cover_image_id_media_id_fk"
          FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'abr_items_images_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "abr_items_images"
          ADD CONSTRAINT "abr_items_images_image_id_media_id_fk"
          FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'abr_items_images_parent_id_fk'
      ) THEN
        ALTER TABLE "abr_items_images"
          ADD CONSTRAINT "abr_items_images_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."abr_items"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'sponsors_logo_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "sponsors"
          ADD CONSTRAINT "sponsors_logo_image_id_media_id_fk"
          FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;

      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'sponsors_logo_dark_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "sponsors"
          ADD CONSTRAINT "sponsors_logo_dark_image_id_media_id_fk"
          FOREIGN KEY ("logo_dark_image_id") REFERENCES "public"."media"("id")
          ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
    CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
    CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
    CREATE INDEX IF NOT EXISTS "events_cover_image_idx" ON "events" USING btree ("cover_image_id");
    CREATE INDEX IF NOT EXISTS "abr_items_cover_image_idx" ON "abr_items" USING btree ("cover_image_id");
    CREATE INDEX IF NOT EXISTS "abr_items_images_order_idx" ON "abr_items_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "abr_items_images_parent_id_idx" ON "abr_items_images" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "abr_items_images_image_idx" ON "abr_items_images" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "sponsors_logo_image_idx" ON "sponsors" USING btree ("logo_image_id");
    CREATE INDEX IF NOT EXISTS "sponsors_logo_dark_image_idx" ON "sponsors" USING btree ("logo_dark_image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "events_cover_image_idx";
    DROP INDEX IF EXISTS "abr_items_cover_image_idx";
    DROP INDEX IF EXISTS "abr_items_images_order_idx";
    DROP INDEX IF EXISTS "abr_items_images_parent_id_idx";
    DROP INDEX IF EXISTS "abr_items_images_image_idx";
    DROP INDEX IF EXISTS "sponsors_logo_image_idx";
    DROP INDEX IF EXISTS "sponsors_logo_dark_image_idx";

    ALTER TABLE "events" DROP CONSTRAINT IF EXISTS "events_cover_image_id_media_id_fk";
    ALTER TABLE "abr_items" DROP CONSTRAINT IF EXISTS "abr_items_cover_image_id_media_id_fk";
    ALTER TABLE "abr_items_images" DROP CONSTRAINT IF EXISTS "abr_items_images_image_id_media_id_fk";
    ALTER TABLE "abr_items_images" DROP CONSTRAINT IF EXISTS "abr_items_images_parent_id_fk";
    ALTER TABLE "sponsors" DROP CONSTRAINT IF EXISTS "sponsors_logo_image_id_media_id_fk";
    ALTER TABLE "sponsors" DROP CONSTRAINT IF EXISTS "sponsors_logo_dark_image_id_media_id_fk";

    DROP TABLE IF EXISTS "abr_items_images";
    ALTER TABLE "events" DROP COLUMN IF EXISTS "cover_image_id";
    ALTER TABLE "abr_items" DROP COLUMN IF EXISTS "cover_image_id";
    ALTER TABLE "sponsors" DROP COLUMN IF EXISTS "logo_image_id";
    ALTER TABLE "sponsors" DROP COLUMN IF EXISTS "logo_dark_image_id";
  `);
}
