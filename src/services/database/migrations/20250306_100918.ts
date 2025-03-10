import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_global_settings_site_identity_global_unit" AS ENUM('m', 'ft');
  ALTER TABLE "global_settings" ADD COLUMN "site_identity_global_unit" "enum_global_settings_site_identity_global_unit" DEFAULT 'm';
  ALTER TABLE "global_settings" ADD COLUMN "site_identity_system_of_units_meta" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "global_settings" DROP COLUMN IF EXISTS "site_identity_global_unit";
  ALTER TABLE "global_settings" DROP COLUMN IF EXISTS "site_identity_system_of_units_meta";
  DROP TYPE "public"."enum_global_settings_site_identity_global_unit";`)
}
