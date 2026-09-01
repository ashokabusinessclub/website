import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_nibbl_menu_category" ADD VALUE IF NOT EXISTS 'Menu archive';
  `);
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // PostgreSQL cannot safely remove enum values while preserving existing rows.
}
