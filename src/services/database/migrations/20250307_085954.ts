import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_global_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__global_settings_v_version_site_identity_global_currency" AS ENUM('USD', 'EUR', 'AED', 'JPY', 'GBP', 'CNY', 'AUD', 'CAD', 'CHF', 'HKD', 'SGD', 'MXN', 'KRW', 'INR', 'RUB', 'BRL', 'ZAR', 'NZD', 'TRY', 'SEK', 'NOK', 'DKK', 'PLN', 'SAR', 'THB', 'IRR', 'DZD');
  CREATE TYPE "public"."enum__global_settings_v_version_site_identity_global_unit" AS ENUM('m', 'ft');
  CREATE TYPE "public"."enum__global_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "_global_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_identity_site_name" varchar,
  	"version_site_identity_site_description" varchar,
  	"version_site_identity_global_currency" "enum__global_settings_v_version_site_identity_global_currency" DEFAULT 'AED',
  	"version_site_identity_currency_meta" jsonb,
  	"version_site_identity_global_unit" "enum__global_settings_v_version_site_identity_global_unit" DEFAULT 'm',
  	"version_site_identity_system_of_units_meta" jsonb,
  	"version_branding_logo_id" integer,
  	"version_branding_logo_square_id" integer,
  	"version_branding_favicon_id" integer,
  	"version_contact_info_contact_name" varchar,
  	"version_contact_info_contact_email" varchar,
  	"version_contact_info_contact_phone" varchar,
  	"version_contact_info_contact_address" varchar,
  	"version_contact_info_social_media_facebook" varchar,
  	"version_contact_info_social_media_twitter" varchar,
  	"version_contact_info_social_media_instagram" varchar,
  	"version_contact_info_social_media_linkedin" varchar,
  	"version_contact_info_social_media_youtube" varchar,
  	"version_contact_info_social_media_whatsapp" varchar,
  	"version_contact_info_social_media_telegram" varchar,
  	"version_global_seo_keywords" varchar,
  	"version_global_seo_og_image_id" integer,
  	"version__status" "enum__global_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "global_settings" ADD COLUMN "_status" "enum_global_settings_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_global_settings_v" ADD CONSTRAINT "_global_settings_v_version_branding_logo_id_assets_id_fk" FOREIGN KEY ("version_branding_logo_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_global_settings_v" ADD CONSTRAINT "_global_settings_v_version_branding_logo_square_id_assets_id_fk" FOREIGN KEY ("version_branding_logo_square_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_global_settings_v" ADD CONSTRAINT "_global_settings_v_version_branding_favicon_id_assets_id_fk" FOREIGN KEY ("version_branding_favicon_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_global_settings_v" ADD CONSTRAINT "_global_settings_v_version_global_seo_og_image_id_assets_id_fk" FOREIGN KEY ("version_global_seo_og_image_id") REFERENCES "public"."assets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_branding_version_branding_logo_idx" ON "_global_settings_v" USING btree ("version_branding_logo_id");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_branding_version_branding_logo_square_idx" ON "_global_settings_v" USING btree ("version_branding_logo_square_id");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_branding_version_branding_favicon_idx" ON "_global_settings_v" USING btree ("version_branding_favicon_id");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_global_seo_version_global_seo_og_image_idx" ON "_global_settings_v" USING btree ("version_global_seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_version_version__status_idx" ON "_global_settings_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_created_at_idx" ON "_global_settings_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_updated_at_idx" ON "_global_settings_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_latest_idx" ON "_global_settings_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_global_settings_v_autosave_idx" ON "_global_settings_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "global_settings__status_idx" ON "global_settings" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_global_settings_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_global_settings_v" CASCADE;
  DROP INDEX IF EXISTS "global_settings__status_idx";
  ALTER TABLE "global_settings" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_global_settings_status";
  DROP TYPE "public"."enum__global_settings_v_version_site_identity_global_currency";
  DROP TYPE "public"."enum__global_settings_v_version_site_identity_global_unit";
  DROP TYPE "public"."enum__global_settings_v_version_status";`)
}
