/**
 * When the `src/config.ts` changes, this will:
 * Generate `src/hues.ts` based on `COLOR_HUES` constant + values in `src/config.js`
 */

import {writeFileSync, readFileSync} from 'fs'
import path from 'path'
import chokidar from 'chokidar'
import {ColorConfig} from '../src/config'
import {compileHues} from '../src/lib/compileHues'

const ROOT_PATH = path.resolve(__dirname, '../../../..')
const CONFIG_PATH = path.resolve(__dirname, '../src/config.ts')

const watcher = chokidar.watch(CONFIG_PATH)

watcher.on('all', () => {
  delete require.cache[CONFIG_PATH]

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {config} = require(CONFIG_PATH)

  generate(config)

  // eslint-disable-next-line no-console
  console.log('Compiled')
})

function generate(config: ColorConfig) {
  const filepath = path.resolve(__dirname, '../src/hues.ts')
  const prettierConfig = JSON.parse(readFileSync(path.resolve(ROOT_PATH, '.prettierrc'), 'utf8'))
  const code = compileHues(config, filepath, prettierConfig)

  writeFileSync(filepath, code)
}
