/* eslint-disable no-console */

import path from 'path'
import {TransformOptions} from '@babel/core'
import {babel} from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import {InputOptions, ModuleFormat, OutputOptions} from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import {ChunkFormat, ChunkTarget} from '../../types'

const FORMAT_TO_ROLLUP: Record<ChunkFormat, ModuleFormat> = {
  commonjs: 'commonjs',
  esm: 'esm',
  'esm-modern': 'esm',
}

export function buildOptions(opts: {
  babelConfig: Omit<TransformOptions, 'include' | 'exclude'>
  build: {
    entryFileNames?: OutputOptions['entryFileNames']
    format: ChunkFormat
    outDir: string
    target: ChunkTarget
  }
  cwd: string
  external: string[]
  input: Record<string, string>
  modern?: boolean
  target: ChunkTarget
  tsconfig: string
}): {inputOptions: InputOptions; outputOptions: OutputOptions} {
  const {babelConfig, build, cwd, external, input, modern, target, tsconfig} = opts

  // see below for details on the options
  const inputOptions: InputOptions = {
    external,
    input, // conditionally required
    plugins: [
      // postcss(),
      // alias(),
      nodeResolve({
        mainFields: ['module', 'jsnext', 'main'],
        browser: target !== 'node',
        exportConditions: [target === 'node' ? 'node' : 'browser'],
        extensions: ['.mjs', '.js', '.jsx', '.json', '.node'],
        preferBuiltins: target === 'node',
      }),
      commonjs({
        esmExternals: false,
        include: /\/node_modules\//,
        requireReturnsDefault: 'namespace',
      }),
      json(),
      typescript({
        cacheRoot: path.resolve(
          cwd,
          `node_modules/.cache/pkg-utils/rpt2/${modern ? 'modern' : build.format}`
        ),
        tsconfig: tsconfig,
        tsconfigOverride: {
          compilerOptions: {
            module: 'ESNext',
            target: 'esnext',
          },
        },
        typescript: require('typescript'),
        useTsconfigDeclarationDir: true,
      }),
      babel({
        babelHelpers: 'bundled',
        babelrc: false,
        compact: false,
        ...babelConfig,
      }),
      // customBabel(),
      // terser(),
      // OMT(), // (@surma/rollup-plugin-off-main-thread)
    ],
    // // advanced input options
    // cache,
    onwarn(warning, warn) {
      // https://github.com/rollup/rollup/blob/0fa9758cb7b1976537ae0875d085669e3a21e918/src/utils/error.ts#L324
      if (warning.code === 'UNRESOLVED_IMPORT') {
        console.warn(
          `Failed to resolve the module ${warning.source} imported by ${warning.importer}` +
            `\nIs the module installed? Note:` +
            `\n ↳ to inline a module into your bundle, install it to "devDependencies".` +
            `\n ↳ to depend on a module via import/require, install it to "dependencies".`
        )

        return
      }

      warn(warning)
    },
    // preserveEntrySignatures,
    // strictDeprecations,
    // // danger zone
    // acorn,
    // acornInjectPlugins,
    context: cwd,
    // moduleContext,
    // preserveSymlinks,
    // shimMissingExports,
    treeshake: {
      propertyReadSideEffects: false,
    },
    // // experimental
    // experimentalCacheExpiry,
    // perf
  }

  const outputOptions: OutputOptions = {
    // core output options
    dir: build.outDir,
    // file,
    format: FORMAT_TO_ROLLUP[build.format],
    // globals,
    // name,
    // plugins,
    // // advanced output options
    // assetFileNames,
    // banner,
    chunkFileNames: () => `_[name]-[hash].js`,
    // compact,
    entryFileNames: build.entryFileNames || (() => `[name].js`),
    // extend,
    // externalLiveBindings,
    // footer,
    // hoistTransitiveImports,
    // inlineDynamicImports,
    // interop,
    // intro,
    // manualChunks,
    // minifyInternalExports,
    // outro,
    // paths,
    // preserveModules,
    // preserveModulesRoot,
    sourcemap: true,
    // sourcemapExcludeSources,
    // sourcemapFile,
    // sourcemapPathTransform,
    // validate,
    // // danger zone
    // amd,
    esModule: false,
    exports: 'auto',
    freeze: false,
    // indent,
    // namespaceToStringTag,
    // noConflict,
    // preferConst,
    // sanitizeFileName,
    // strict,
    // systemNullSetters,
  }

  return {inputOptions, outputOptions}
}
