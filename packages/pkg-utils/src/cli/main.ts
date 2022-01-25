/* eslint-disable no-console */

import chalk from 'chalk'
import {isString} from '../helpers'
import {ChunkTarget} from '../types'
import {bundleCommand} from './commands/bundleCommand'
import {transpileCommand} from './commands/transpileCommand'
import {validateCommand} from './commands/validateCommand'
import {getCLIContext} from './helpers'

async function main() {
  const {cmd, cwd: currentCwd, flags} = await getCLIContext()
  const cwd = isString(flags.cwd) ? flags.cwd : currentCwd

  if (!cmd) {
    throw new Error('pkg-utils: missing command')
  }

  if (cmd === 'bundle') {
    await bundleCommand({
      cwd,
      target: (isString(flags.target) ? flags.target : 'web') as ChunkTarget,
      tsconfig: isString(flags.tsconfig) ? flags.tsconfig : undefined,
      validate: Boolean(flags.validate),
      watch: Boolean(flags.watch),
    })

    return
  }

  if (cmd === 'transpile') {
    await transpileCommand({
      cwd,
      target: (isString(flags.target) ? flags.target : 'web') as ChunkTarget,
      tsconfig: isString(flags.tsconfig) ? flags.tsconfig : undefined,
      watch: Boolean(flags.watch),
    })

    return
  }

  if (cmd === 'validate') {
    await validateCommand({cwd})

    return
  }

  throw new Error(`pkg-utils: unknown command: "${cmd}"`)
}

main().catch((err) => {
  console.error(`${chalk.red('error')} ${err.message}`)
  process.exit(1)
})
