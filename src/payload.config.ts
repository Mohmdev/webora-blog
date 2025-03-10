import path from 'path'
import { fileURLToPath } from 'url'
import { BannerBlock } from '@blocks/Banner/config'
import { CallToActionBlock } from '@blocks/CallToAction/config'
import { CodeBlock } from '@blocks/Code/config'
import { ContentBlock } from '@blocks/Content/config'
import { FormBlock } from '@blocks/Form/config'
import { MediaBlock } from '@blocks/MediaBlock/config'
import { ArchiveBlock } from '@blocks/ArchiveBlock/config'
import { Footer } from '@CMS/design/Footer/config'
import { GlobalSettings } from '@CMS/design/GlobalSettings/config'
import { MainMenu } from '@CMS/design/MainMenu/config'
import { Posts } from '@CMS/content/config.Posts'
import { Categories } from '@CMS/content/config.Categories'
import { Pages } from '@CMS/content/config.Pages'
import { Tags } from '@CMS/content/config.Tags'
import { Users } from '@auth/Users/config'
import { getServerSideURL } from '@data/getURL'
import { adminConfig } from '@services/admin/config'
import { collectionGroup, globalGroup } from '@services/admin/groupContent'
import { vercelPostgres } from '@services/database/config.vercelPostgres'
import { defaultLexical } from '@services/editor/defaultLexical'
import { emailAdapter } from '@services/email/config'
import { formBuilderService } from '@services/form-builder/config.plugin'
import { nestedDocsService } from '@services/nested-docs/config.plugin'
import { redirectsPluginConfig } from '@services/redirects/config.plugin'
import { scheduledJobsService } from '@services/scheduled-jobs/config'
import { searchService } from '@services/search/config.plugin'
import { seoService } from '@services/seo/config.plugin'
import { vercelBlob } from '@services/storage/config.plugin.vercelBlob'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Media } from '@CMS/resources/Media/config.collection'
import { Assets } from '@CMS/resources/Assets/config.collection'
import { UserPhotos } from '@auth/UserPhotos/config.collection'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	collections: [
		...collectionGroup('Content', [
			Pages,
			Posts,
			Categories,
			Tags,
		]),
		...collectionGroup('Resources', [Media, Assets]),
		...collectionGroup('Accounts', [Users, UserPhotos]),
	],
	globals: [...globalGroup('Design', [MainMenu, Footer]), GlobalSettings],
	blocks: [
		CallToActionBlock,
		BannerBlock,
		CodeBlock,
		ContentBlock,
		MediaBlock,
		FormBlock,
		ArchiveBlock,
	],
	db: vercelPostgres,
	admin: adminConfig,
	editor: defaultLexical,
	email: emailAdapter,
	jobs: scheduledJobsService,
	plugins: [
		vercelBlob,
		searchService,
		formBuilderService,
		seoService,
		nestedDocsService,
		redirectsPluginConfig,
	],
	sharp,
	cors: [getServerSideURL()].filter(Boolean),
	secret: process.env.PAYLOAD_SECRET || 'isItASecret?',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	// cookiePrefix: `${process.env.COOKIE_PREFIX}`,
	// debug: true,
	telemetry: false,
})
