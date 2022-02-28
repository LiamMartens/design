const ROOT_PATH = process.env.ROOT_PATH

const RE_URL = /http:\/\/([^:/\s]+)(:[0-9]+)?/g
const RE_VITE_FS_PREFIX = /\/@fs\//g
const RE_VITE_FS_SUFFIX = /\?([a-z]{1})=([0-9]+)/g

export function formatStack(stack: string): string {
  let ret = decodeURIComponent(stack)

  ret = stack.replace(RE_URL, '').replace(RE_VITE_FS_PREFIX, '/').replace(RE_VITE_FS_SUFFIX, '')

  if (ROOT_PATH) return replaceRootPath(ret, ROOT_PATH + '/')

  return ret
}

function replaceRootPath(str: string, rootPath: string) {
  const re = new RegExp(rootPath.replace(/\//g, '\\/'), 'g')

  return str.replace(re, '')
}
