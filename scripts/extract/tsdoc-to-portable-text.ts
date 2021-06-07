import path from 'path'
import createSanityClient from '@sanity/client'
import {extract, transform} from '@sanity/tsdoc-to-portable-text'
import chalk from 'chalk'
import {readJSONFile} from './helpers'

const CWD = process.cwd()
const ROOT_PATH = path.resolve(__dirname, '../..')
const IGNORE_MSG_IDS = ['ae-internal-missing-underscore']

const config = {
  sanity: {
    projectId: getEnv('SANITY_PROJECT_ID'),
    dataset: getEnv('SANITY_DATASET'),
    token: process.env.SANITY_API_TOKEN,
  },
}

function getEnv(key: string) {
  const val = process.env[key]

  if (val === undefined) {
    throw new Error(`missing environment variable: ${key}`)
  }

  return val
}

async function extractPackage(name: string) {
  const packagePath = path.resolve(ROOT_PATH, './packages', name)
  const packageJsonPath = path.resolve(packagePath, 'package.json')
  const pkg = await readJSONFile(packageJsonPath)

  const result = await extract('lib/esm/index.d.ts', {
    packagePath,
    tsconfigPath: 'tsconfig.extract.json',
  })

  for (const msg of result.messages) {
    if (IGNORE_MSG_IDS.includes(msg.messageId)) {
      continue
    }

    const sourceFilePath = msg.sourceFilePath && path.relative(CWD, msg.sourceFilePath)

    if (msg.logLevel === 'error') {
      console.log(
        [
          `${chalk.cyan(sourceFilePath || '?')}`,
          `:${chalk.yellow(msg.sourceFileLine)}:${chalk.yellow(msg.sourceFileColumn)}`,
          ` - ${chalk.red('error')} ${chalk.gray(msg.messageId)}\n`,
          msg.text,
          '\n',
        ].join('')
      )
    }

    if (msg.logLevel === 'warning') {
      console.log(
        [
          `${chalk.cyan(sourceFilePath || '?')}`,
          `:${chalk.yellow(msg.sourceFileLine)}:${chalk.yellow(msg.sourceFileColumn)}`,
          ` - ${chalk.yellow('warning')} ${chalk.gray(msg.messageId)}\n`,
          msg.text,
          '\n',
        ].join('')
      )
    }
  }

  const hasErrors = result.messages.filter((msg) => msg.logLevel === 'error').length

  if (hasErrors > 0) {
    process.exit(1)
  }

  const p = result.apiPackage.name.split('/')
  const packageScope = p.length > 1 ? p[0] : null
  const packageName = p.length > 1 ? p[1] : p[0]

  const docs = transform(result, {
    package: {scope: packageScope, name: packageName, version: pkg.version},
  })

  return docs
}

async function extractTsdocToPortableText() {
  const packages = await Promise.all([
    extractPackage('@sanity/color'),
    extractPackage('@sanity/icons'),
    extractPackage('@sanity/logos'),
    extractPackage('@sanity/ui'),
  ])

  const docs = packages.reduce((acc, docs) => acc.concat(docs))

  if (config.sanity.token) {
    const sanityClient = createSanityClient({
      ...config.sanity,
      apiVersion: '2021-06-01',
      useCdn: false,
    })

    let tx = sanityClient.transaction()

    for (const doc of docs) {
      tx = tx.createOrReplace(doc)
    }

    await tx.commit()
  } else {
    console.log(
      `no token provided - skipped writing docs to Sanity (${config.sanity.projectId}:${config.sanity.dataset})`
    )
  }
}

extractTsdocToPortableText().catch((error) => {
  console.log(`${chalk.red('error')} ${error.message}`)
  process.exit(0)
})
