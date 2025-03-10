import { anyone } from '@auth/access/anyone'
import { hasAdminPanelAccess } from '@auth/access/hasAdminPanelAccess'
import { isAdminFieldLevel } from '@auth/access/isAdmin'
import { isAdminOrEditor } from '@auth/access/isAdminOrEditor'
import { isAdminOrEditorOrSelf } from '@auth/access/isAdminOrEditorOrSelf'
import {
  isAdminOrSelf,
  isAdminOrSelfFieldLevel,
} from '@auth/access/isAdminOrSelf'
import {
  isAuthenticatedFieldLevel,
} from '@auth/access/isAuthenticated'
import { ROLES_WITH_ADMIN_ACCESS } from '@services/control-board'
import { generateForgotPasswordEmail } from '@services/email/generateForgotPasswordEmail'
import { generateVerificationEmail } from '@services/email/generateVerificationEmail'
import type { CollectionConfig } from 'payload'
import { ensureFirstUserIsAdmin } from './ensureFirstUserIsAdmin'

export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['photo', 'username', 'role', 'email'],
  },
  defaultPopulate: {
    email: true,
    username: true,
    firstName: true,
    lastName: true,
    role: true,
    photo: true,
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (!value) return value // If no value, return it as is
            return value.trim().toLowerCase()
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'user-photos',
                  access: {
                    create: isAdminOrSelfFieldLevel,
                    update: isAdminOrSelfFieldLevel,
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'firstName',
                  type: 'text',
                  // required: true,
                },
                {
                  name: 'lastName',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Permissions',
          access: {
            read: isAuthenticatedFieldLevel,
          },
          fields: [
            {
              name: 'role',
              required: true,
              type: 'select',
              access: {
                create: isAdminFieldLevel,
                update: isAdminFieldLevel,
              },
              defaultValue: 'public',
              options: ['admin', 'editor', 'public'],
              hasMany: false, // setting this to `true` makes the roles field type definition an array. Keep it false.
              saveToJWT: true,
              hooks: {
                beforeChange: [ensureFirstUserIsAdmin],
              },
            },
          ],
        },
        {
          label: 'Danger Zone',
          fields: [
            {
              type: 'ui',
              name: 'dbInteractionZone',
              label: 'Database',
              admin: {
                components: {
                  Field:
                    '@services/seed/danger-zone/Component#DbInteractionZone',
                },
                condition: (_, siblingData) => {
                  return siblingData.role === 'admin'
                },
              },
            },
          ],
        },
      ],
    },
  ],
  access: {
    create: anyone,
    read: isAdminOrEditorOrSelf,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
    // Determines which users can unlock other users who may be blocked due to failing too many login attempts.
    unlock: isAdminOrEditor,
    // Determines whether or not the currently logged in user can access the admin
    admin: hasAdminPanelAccess(...ROLES_WITH_ADMIN_ACCESS),
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: true,
      requireUsername: true,
    },
    cookies: {
      // HTTPS only cookies
      secure:
        process.env.NODE_ENV === 'production' &&
          !process.env.DISABLE_SECURE_COOKIE
          ? true // true in production
          : undefined,
      sameSite: 'None', // cross-origin requests
      domain: process.env.COOKIE_DOMAIN || undefined, // cross-domain authentication
    },
    tokenExpiration: 28800, // 8 hours
    // verify: false,
    forgotPassword: {
      generateEmailHTML: generateForgotPasswordEmail,
      generateEmailSubject: () => 'Reset your password',
    },
    verify: {
      generateEmailHTML: generateVerificationEmail,
      generateEmailSubject: () => 'Verify your email',
    },
  },
}
