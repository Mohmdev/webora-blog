import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from '@auth/Users/config'
import type { Config } from 'payload'
import { timeZones } from './timeZones'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const adminConfig: Config['admin'] = {
  avatar: {
    Component: '@services/authentication/AdminAvatar#AdminAvatar',
  },
  autoLogin: {
    username: process.env.ROOT_USER_USERNAME,
    password: process.env.ROOT_USER_PASSWORD,
  },
  timezones: {
    defaultTimezone: 'Europe/Istanbul',
    supportedTimezones: timeZones,
  },
  components: {
    graphics: {
      Icon: '@services/admin/DynamicLogo#NavbarLogo',
      Logo: '@services/admin/DynamicLogo#MainLogo',
    },
    // beforeNavLinks: ['@services/admin/DynamicLogo#SidebarLogo'],
    // afterNavLinks: ['@services/admin/AfterNav#AfterNavComponent']
    // beforeLogin: ['@admin-components/BeforeLogin']
    // beforeDashboard: ['@admin-components/BeforeDashboard']
  },
  meta: {
    title: 'Webora Blog Admin Dashboard',
    description:
      'Create, edit, and manage content',
    icons: [
      {
        rel: 'icon',
        type: 'image/svg',
        url: '/assets/nextjs-favicon.svg',
      },
      {
        rel: 'favicon',
        type: 'image/svg',
        url: '/assets/nextjs-favicon.svg',
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/svg',
        url: '/assets/nextjs-favicon.svg',
      },
    ],
    // you share links to your admin panel online and through social media.
    openGraph: {
      title: 'Webora Blog Admin Dashboard',
      description:
        'Create, edit, and manage content',
      images: [
        {
          height: 600,
          width: 800,
          url: '/assets/home-bg.png',
        },
      ],
    },
    // Text that appends the meta/page title displayed in the browser tab.
    titleSuffix: '| Webora Blog',
  },
  importMap: {
    baseDir: path.resolve(dirname),
  },
  user: Users.slug,
  livePreview: {
    breakpoints: [
      {
        label: 'Mobile',
        name: 'mobile',
        width: 375,
        height: 667,
      },
      {
        label: 'Tablet',
        name: 'tablet',
        width: 768,
        height: 1024,
      },
      {
        label: 'Desktop',
        name: 'desktop',
        width: 1440,
        height: 900,
      },
    ],
  },
  // routes?: {
  //   /** The route for the account page. */
  //   account?: string;
  //   /** The route for the create first user page. */
  //   createFirstUser?: string;
  //   /** The route for the forgot password page. */
  //   forgot?: string;
  //   /** The route the user will be redirected to after being inactive for too long. */
  //   inactivity?: string;
  //   /** The route for the login page. */
  //   login?: string;
  //   /** The route for the logout page. */
  //   logout?: string;
  //   /** The route for the reset password page. */
  //   reset?: string;
  //   /** The route for the unauthorized page. */
  //   unauthorized?: string;
  // };
}
