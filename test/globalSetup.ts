/* eslint-disable no-console */

import fs from 'fs/promises'
import getPort from 'get-port'
import {config} from './config'
import {startWorkshopServer, WorkshopServer} from './workshop'

declare global {
  var __SERVER__: WorkshopServer // eslint-disable-line no-var
}

export default async (): Promise<void> => {
  const port = config.build ? 9009 : await getPort()

  await fs.writeFile(config.statePath, `module.exports = {port: ${port}}\n`)

  function handleExit(code: number | null) {
    server
      .close()
      .then(() => {
        process.exit(code || 0)
      })
      .catch((err) => {
        console.error(err)
        process.exit(1)
      })
  }

  const server = await startWorkshopServer({
    build: config.build,
    debug: config.debug,
    onExit: handleExit,
    port,
  })

  process.on('SIGINT', handleExit)

  // Exit
  process.on('exit', handleExit)

  // Catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', handleExit)
  process.on('SIGUSR2', handleExit)

  // Catches uncaught exceptions
  process.on('uncaughtException', handleExit)

  global.__SERVER__ = server
}
