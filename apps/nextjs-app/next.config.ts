import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = (phase: string, { defaultConfig }: { defaultConfig: NextConfig }) => ({
  transpilePackages: ['@repo/ui'],
  ...(phase === PHASE_DEVELOPMENT_SERVER
    ? {
        turbopack: {
          rules: {
            '*.svg': {
              loaders: ['@svgr/webpack'],
              as: '*.js',
            },
          },
        },
      }
    : {
        webpack: (config: { module: { rules: { test: RegExp; use: string[] }[] } }) => {
          config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          });
          return config;
        },
      }),
});

export default nextConfig;
