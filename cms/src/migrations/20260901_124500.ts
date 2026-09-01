import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_role') THEN
        CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_nibbl_menu_category') THEN
        CREATE TYPE "public"."enum_nibbl_menu_category" AS ENUM('Nostalgic Classics', 'Signature Pop-Up Specials', '2025 Upcoming Menu');
      END IF;
    END $$;

    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" "enum_users_role" DEFAULT 'editor';
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_token" varchar;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_expiration" timestamp(3) with time zone;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "salt" varchar;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "hash" varchar;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "login_attempts" numeric DEFAULT 0;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "lock_until" timestamp(3) with time zone;

    ALTER TABLE "departments" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "departments" ADD COLUMN IF NOT EXISTS "order" numeric DEFAULT 99;
    ALTER TABLE "departments" ADD COLUMN IF NOT EXISTS "icon" varchar;
    ALTER TABLE "departments" ADD COLUMN IF NOT EXISTS "responsibilities" jsonb;
    ALTER TABLE "departments" ADD COLUMN IF NOT EXISTS "content" varchar;

    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "category" varchar;
    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "cover" varchar;
    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "location" varchar;
    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;
    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "apply_url" varchar;
    ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "content" varchar;

    ALTER TABLE "abr_items" ADD COLUMN IF NOT EXISTS "author" varchar;
    ALTER TABLE "abr_items" ADD COLUMN IF NOT EXISTS "type" varchar DEFAULT 'Publication';
    ALTER TABLE "abr_items" ADD COLUMN IF NOT EXISTS "cover" varchar;
    ALTER TABLE "abr_items" ADD COLUMN IF NOT EXISTS "tags" jsonb;
    ALTER TABLE "abr_items" ADD COLUMN IF NOT EXISTS "excerpt" varchar;
    ALTER TABLE "abr_items" ADD COLUMN IF NOT EXISTS "content" varchar;

    CREATE TABLE IF NOT EXISTS "sponsors" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "logo" varchar;
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "logo_dark" varchar;
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "website" varchar;
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "year" varchar;
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "order" numeric DEFAULT 99;
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "content" varchar;

    CREATE TABLE IF NOT EXISTS "nibbl_menu" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    ALTER TABLE "nibbl_menu" ADD COLUMN IF NOT EXISTS "category" "enum_nibbl_menu_category" DEFAULT 'Nostalgic Classics';
    ALTER TABLE "nibbl_menu" ADD COLUMN IF NOT EXISTS "note" varchar;
    ALTER TABLE "nibbl_menu" ADD COLUMN IF NOT EXISTS "price" varchar;
    ALTER TABLE "nibbl_menu" ADD COLUMN IF NOT EXISTS "tag" varchar;
    ALTER TABLE "nibbl_menu" ADD COLUMN IF NOT EXISTS "available" boolean DEFAULT true;
    ALTER TABLE "nibbl_menu" ADD COLUMN IF NOT EXISTS "order" numeric DEFAULT 99;
    ALTER TABLE "nibbl_menu" ADD COLUMN IF NOT EXISTS "content" varchar;

    CREATE UNIQUE INDEX IF NOT EXISTS "sponsors_slug_idx" ON "sponsors" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "sponsors_updated_at_idx" ON "sponsors" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "sponsors_created_at_idx" ON "sponsors" USING btree ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "nibbl_menu_slug_idx" ON "nibbl_menu" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "nibbl_menu_updated_at_idx" ON "nibbl_menu" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "nibbl_menu_created_at_idx" ON "nibbl_menu" USING btree ("created_at");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "sponsors_slug_idx";
    DROP INDEX IF EXISTS "sponsors_updated_at_idx";
    DROP INDEX IF EXISTS "sponsors_created_at_idx";
    DROP INDEX IF EXISTS "nibbl_menu_slug_idx";
    DROP INDEX IF EXISTS "nibbl_menu_updated_at_idx";
    DROP INDEX IF EXISTS "nibbl_menu_created_at_idx";
  `);
}
