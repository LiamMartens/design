import {getContrast} from 'polished'
import {format, Options as PrettierOptions} from 'prettier'
import {ColorConfig} from '../config'
import {COLOR_HUES, COLOR_TINTS} from '../constants'
import {ColorHueKey, ColorValue, ColorTintKey} from '../types'
import {getColorHex} from './getColorHex'

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

// Given a hue (e.g. `red`, `blue`), grab the colors from configured values
// and generate a named export containing a generated set of tints
// Note: A more compact format + expander function was considered,
// but only amounted to ~72 byte decrease in bundle size after gziping
function buildExport(config: ColorConfig, hue: ColorHueKey) {
  if (!config.hues[hue]) {
    throw new Error(`src/config is missing export for ${hue}`)
  }

  const initial = {} as Partial<{[key in ColorTintKey]: ColorValue}>
  const tints = COLOR_TINTS.reduce((acc, tint) => {
    const hex = getColorHex(config.hues[hue], tint)

    acc[tint] = {
      title: `${hue.slice(0, 1).toUpperCase()}${hue.slice(1)} ${tint}`,
      hex,
      contrast: {
        onBlack: getContrast(hex, config.black),
        onWhite: getContrast(hex, config.white),
      },
    }

    return acc
  }, initial)

  return `/**\n * @public\n */\nexport const ${hue}: ColorTints = ${JSON.stringify(tints, null, 2)}`
}

export function compileHues(
  config: ColorConfig,
  filepath: string,
  prettierConfig: PrettierOptions
): string {
  // Generate code
  const rawCode = `${GENERATED_BANNER}

import {ColorTints} from './types'

${COLOR_HUES.map((hueKey) => buildExport(config, hueKey)).join('\n\n')}

/**
 * @public
 */
export const hues = {${COLOR_HUES.join(', ')}};
`

  const code = format(rawCode, {filepath, ...prettierConfig})

  return code
}
