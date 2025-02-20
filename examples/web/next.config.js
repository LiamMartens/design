/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTranspileModules = require('next-transpile-modules')

const MONOREPO_PACKAGES = [
  '@sanity/color',
  '@sanity/icons',
  '@sanity/logos',
  '@sanity/ui',
  '@sanity/ui-workshop',
]

module.exports = withTranspileModules(
  // Add monorepo sibling packages to includes
  MONOREPO_PACKAGES
)(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })({
    typescript: {
      tsconfigPath: './tsconfig.next.json',
    },

    webpack: (config) => {
      // Aliases
      config.resolve.alias = {
        ...config.resolve.alias,

        react: require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
        'styled-components': require.resolve('styled-components'),
      }

      return config
    },
  })
)
