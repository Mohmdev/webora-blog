import { withToolbar } from '@lib/vercel-toolbar'
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import redirects from './redirects.cjs'
import { logger } from './src/services/database/logger'

logger.logEnvironment()

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects,
  experimental: {
    reactCompiler: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year,
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
      {
        hostname: '127.0.0.1',
        protocol: 'http',
      },
      {
        hostname: 'localhost',
        protocol: 'http',
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
      },
    ],
  },
}

export default withToolbar(withPayload(nextConfig))
