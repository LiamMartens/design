import {black, ColorTints, hues, white} from '@sanity/color'
import {rgba} from '../lib/color-fns'
import {createColorTheme, ThemeColorToneKey} from '../lib/theme'
import {multiply, screen} from './helpers'

const tones: Record<ThemeColorToneKey, ColorTints> = {
  default: hues.gray,
  transparent: hues.gray,
  primary: hues.blue,
  positive: hues.green,
  caution: hues.yellow,
  critical: hues.red,
}

const NEUTRAL_TONES = ['default', 'transparent']

export const color = createColorTheme({
  base: ({dark, name}) => {
    const mix = dark ? screen : multiply

    if (name === 'default') {
      const tints = tones.default
      const bg = dark ? hues.gray[950].hex : white.hex
      const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

      return {
        fg: dark ? white.hex : black.hex,
        bg,
        border: mix(bg, tints[dark ? 800 : 200].hex),
        focusRing: hues.blue[dark ? 500 : 500].hex,
        shadow: {
          outline: rgba(tints[500].hex, 0.4),
          umbra: rgba(dark ? black.hex : tints[500].hex, dark ? 0.4 : 0.2),
          penumbra: rgba(dark ? black.hex : tints[500].hex, dark ? 0.28 : 0.14),
          ambient: rgba(dark ? black.hex : tints[500].hex, dark ? 0.24 : 0.12),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    }

    const tints = tones[name] || tones.default
    const bg = tints[dark ? 900 : 50].hex
    const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

    return {
      fg: tints[dark ? 100 : 900].hex,
      bg,
      border: mix(bg, tints[dark ? 800 : 200].hex),
      focusRing: tints[500].hex,
      shadow: {
        outline: rgba(tints[500].hex, 0.4),
        umbra: rgba(dark ? black.hex : tints[500].hex, dark ? 0.4 : 0.2),
        penumbra: rgba(dark ? black.hex : tints[500].hex, dark ? 0.28 : 0.14),
        ambient: rgba(dark ? black.hex : tints[500].hex, dark ? 0.24 : 0.12),
      },
      skeleton: {
        from: skeletonFrom,
        to: rgba(skeletonFrom, 0.5),
      },
    }
  },

  solid: ({base, dark, name, state, tone}) => {
    const mix = dark ? screen : multiply
    const mix2 = dark ? multiply : screen
    const defaultTints = tones[name] || tones.default
    const isNeutral = NEUTRAL_TONES.includes(name) && NEUTRAL_TONES.includes(tone)

    let tints = tones[tone === 'default' ? name : tone] || defaultTints

    if (state === 'disabled') {
      tints = defaultTints

      const bg = mix(base.bg, tints[dark ? 800 : 200].hex)
      const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

      return {
        bg,
        bg2: mix2(bg, tints[dark ? 50 : 950].hex),
        border: mix(base.bg, tints[dark ? 800 : 200].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
        muted: {
          fg: mix(base.bg, tints[dark ? 950 : 50].hex),
        },
        accent: {
          fg: mix(base.bg, tints[dark ? 950 : 50].hex),
        },
        link: {
          fg: mix(base.bg, tints[dark ? 950 : 50].hex),
        },
        code: {
          bg,
          fg: mix(base.bg, tints[dark ? 950 : 50].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    }

    if (state === 'hovered') {
      const bg = mix(base.bg, tints[dark ? 200 : 700].hex)
      const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

      return {
        bg,
        bg2: mix2(bg, tints[dark ? 50 : 950].hex),
        border: mix(base.bg, tints[dark ? 200 : 700].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
        muted: {
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        accent: {
          fg: mix2(bg, hues.red[dark ? 800 : 200].hex),
        },
        link: {
          fg: mix2(bg, hues.blue[dark ? 800 : 200].hex),
        },
        code: {
          bg: mix(bg, tints[dark ? 950 : 50].hex),
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    }

    if (state === 'pressed') {
      const bg = mix(base.bg, tints[dark ? 200 : 800].hex)
      const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

      return {
        bg: mix(base.bg, tints[dark ? 100 : 800].hex),
        bg2: mix2(bg, tints[dark ? 50 : 950].hex),
        border: mix(base.bg, tints[dark ? 200 : 800].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
        muted: {
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        accent: {
          fg: mix2(bg, hues.red[dark ? 800 : 200].hex),
        },
        link: {
          fg: mix2(bg, hues.blue[dark ? 800 : 200].hex),
        },
        code: {
          bg: mix(bg, tints[dark ? 950 : 50].hex),
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    }

    if (state === 'selected') {
      if (isNeutral) {
        tints = tones.primary
      }

      const bg = mix(base.bg, tints[dark ? 200 : 800].hex)
      const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

      return {
        bg,
        bg2: mix2(bg, tints[dark ? 50 : 950].hex),
        border: mix(base.bg, tints[dark ? 200 : 800].hex),
        fg: mix(base.bg, dark ? black.hex : white.hex),
        muted: {
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        accent: {
          fg: mix2(bg, hues.red[dark ? 800 : 200].hex),
        },
        link: {
          fg: mix2(bg, hues.blue[dark ? 800 : 200].hex),
        },
        code: {
          bg: mix(bg, tints[dark ? 950 : 50].hex),
          fg: mix(base.bg, tints[dark ? 800 : 200].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    }

    // state: "enabled" | unknown
    const bg = mix(base.bg, tints[dark ? 300 : 600].hex)
    const skeletonFrom = mix2(bg, tints[dark ? 200 : 800].hex)

    return {
      bg,
      bg2: mix2(bg, tints[dark ? 50 : 950].hex),
      border: bg,
      fg: mix(base.bg, dark ? black.hex : white.hex),
      muted: {
        fg: mix(base.bg, tints[dark ? 900 : 100].hex),
      },
      accent: {
        fg: mix2(bg, hues.red[dark ? 900 : 100].hex),
      },
      link: {
        fg: mix2(bg, hues.blue[dark ? 900 : 100].hex),
      },
      code: {
        bg: mix(bg, tints[dark ? 950 : 50].hex),
        fg: mix(base.bg, tints[dark ? 900 : 100].hex),
      },
      skeleton: {
        from: skeletonFrom,
        to: rgba(skeletonFrom, 0.5),
      },
    }
  },

  muted: ({base, dark, name, state, tone}) => {
    const mix = dark ? screen : multiply
    const defaultTints = tones[name] || tones.default
    const isNeutral = NEUTRAL_TONES.includes(name) && NEUTRAL_TONES.includes(tone)

    let tints = tones[tone === 'default' ? name : tone] || defaultTints

    if (state === 'disabled') {
      tints = defaultTints

      const bg = base.bg
      const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

      return {
        bg,
        bg2: mix(bg, tints[dark ? 950 : 50].hex),
        border: mix(bg, tints[dark ? 950 : 50].hex),
        fg: mix(bg, tints[dark ? 800 : 200].hex),
        muted: {
          fg: mix(bg, tints[dark ? 900 : 100].hex),
        },
        accent: {
          fg: mix(bg, tints[dark ? 900 : 100].hex),
        },
        link: {
          fg: mix(bg, tints[dark ? 900 : 100].hex),
        },
        code: {
          bg,
          fg: mix(bg, tints[dark ? 900 : 100].hex),
        },
        skeleton: {
          from: rgba(skeletonFrom, 0.5),
          to: rgba(skeletonFrom, 0.25),
        },
      }
    }

    if (state === 'hovered') {
      // if (isNeutral) {
      //   tints = tones.primary
      // }

      const bg = mix(base.bg, tints[dark ? 950 : 50].hex)
      const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

      return {
        bg,
        bg2: mix(bg, tints[dark ? 950 : 50].hex),
        border: mix(bg, tints[dark ? 800 : 200].hex),
        fg: mix(bg, tints[dark ? 300 : 700].hex),
        muted: {
          fg: mix(bg, hues.gray[dark ? 400 : 600].hex),
        },
        accent: {
          fg: mix(bg, hues.red[dark ? 400 : 500].hex),
        },
        link: {
          fg: mix(bg, hues.blue[dark ? 400 : 600].hex),
        },
        code: {
          bg: mix(bg, tints[dark ? 950 : 50].hex),
          fg: mix(bg, tints[dark ? 400 : 600].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    }

    if (state === 'pressed') {
      if (isNeutral) {
        tints = tones.primary
      }

      const bg = mix(base.bg, tints[dark ? 900 : 100].hex)
      const skeletonFrom = mix(bg, tints[dark ? 800 : 200].hex)

      return {
        bg,
        bg2: mix(bg, tints[dark ? 950 : 50].hex),
        border: mix(bg, tints[dark ? 900 : 200].hex),
        fg: mix(base.bg, tints[dark ? 300 : 700].hex),
        muted: {
          fg: mix(base.bg, hues.gray[dark ? 400 : 600].hex),
        },
        accent: {
          fg: mix(bg, hues.red[dark ? 400 : 500].hex),
        },
        link: {
          fg: mix(bg, hues.blue[dark ? 400 : 600].hex),
        },
        code: {
          bg: mix(bg, tints[dark ? 950 : 50].hex),
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    }

    if (state === 'selected') {
      if (isNeutral) {
        tints = tones.primary
      }

      const bg = mix(base.bg, tints[dark ? 900 : 100].hex)
      const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

      return {
        bg,
        bg2: mix(bg, tints[dark ? 950 : 50].hex),
        border: mix(bg, tints[dark ? 800 : 200].hex),
        fg: mix(base.bg, tints[dark ? 200 : 800].hex),
        muted: {
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        accent: {
          fg: mix(bg, hues.red[dark ? 400 : 500].hex),
        },
        link: {
          fg: mix(bg, hues.blue[dark ? 400 : 600].hex),
        },
        code: {
          bg: mix(bg, tints[dark ? 950 : 50].hex),
          fg: mix(base.bg, tints[dark ? 400 : 600].hex),
        },
        skeleton: {
          from: skeletonFrom,
          to: rgba(skeletonFrom, 0.5),
        },
      }
    }

    const {bg, border} = base
    const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

    return {
      bg,
      bg2: mix(bg, tints[dark ? 950 : 50].hex),
      border, // mix(bg, tints[dark ? 800 : 200].hex),
      fg: mix(bg, tints[dark ? 400 : 600].hex),
      muted: {
        fg: mix(bg, hues.gray[dark ? 400 : 600].hex),
      },
      accent: {
        fg: mix(bg, hues.red[dark ? 400 : 500].hex),
      },
      link: {
        fg: mix(bg, hues.blue[dark ? 400 : 600].hex),
      },
      code: {
        bg: mix(bg, tints[dark ? 950 : 50].hex),
        fg: mix(bg, tints[dark ? 400 : 600].hex),
      },
      skeleton: {
        from: skeletonFrom,
        to: rgba(skeletonFrom, 0.5),
      },
    }
  },

  button: ({base, mode, muted, solid}) => {
    if (mode === 'bleed') {
      return {
        enabled: {
          ...muted.enabled,
          border: muted.enabled.bg,
        },
        hovered: {
          ...muted.hovered,
          border: muted.hovered.bg,
        },
        pressed: {
          ...muted.pressed,
          border: muted.pressed.bg,
        },
        selected: {
          ...muted.selected,
          border: muted.selected.bg,
        },
        disabled: {
          ...muted.disabled,
          border: muted.disabled.bg,
        },
      }
    }

    if (mode === 'ghost') {
      return {
        ...solid,
        enabled: {
          ...muted.enabled,
          border: base.border,
        },
        disabled: muted.disabled,
      }
    }

    return solid
  },

  card: ({base, dark, muted, name, solid, state}) => {
    const {bg, fg, border} = base

    if (state === 'hovered') {
      return muted[name].hovered
    }

    if (state === 'disabled') {
      return muted[name].disabled
    }

    const isNeutral = NEUTRAL_TONES.includes(name)
    const tints = tones[name] || tones.default
    const mix = dark ? screen : multiply

    if (state === 'pressed') {
      if (isNeutral) {
        return muted.primary.pressed
      }

      return muted[name].pressed
    }

    if (state === 'selected') {
      if (isNeutral) {
        return solid.primary.enabled
      }

      return solid[name].enabled
    }

    const skeletonFrom = mix(bg, tints[dark ? 900 : 100].hex)

    return {
      bg,
      bg2: mix(bg, tints[dark ? 950 : 50].hex),
      fg,
      border,
      muted: {
        fg: mix(bg, hues.gray[dark ? 400 : 600].hex),
      },
      accent: {
        fg: mix(bg, hues.red[dark ? 400 : 500].hex),
      },
      link: {
        fg: mix(bg, hues.blue[dark ? 400 : 600].hex),
      },
      code: {
        bg: mix(bg, tints[dark ? 950 : 50].hex),
        fg: tints[dark ? 200 : 700].hex,
      },
      skeleton: {
        from: skeletonFrom,
        to: rgba(skeletonFrom, 0.5),
      },
    }
  },

  input: ({base, dark, mode, state}) => {
    const mix = dark ? screen : multiply
    const {bg, fg, border} = base

    if (mode === 'invalid') {
      const tints = tones.critical

      return {
        bg: mix(bg, tints[dark ? 950 : 50].hex),
        fg: mix(bg, tints[dark ? 400 : 600].hex),
        border: mix(bg, tints[dark ? 800 : 200].hex),
        placeholder: mix(bg, tints[dark ? 600 : 400].hex),
      }
    }

    if (state === 'hovered') {
      return {
        bg,
        fg,
        border: mix(bg, hues.gray[dark ? 700 : 300].hex),
        placeholder: mix(bg, hues.gray[dark ? 600 : 400].hex),
      }
    }

    if (state === 'disabled') {
      return {
        bg: mix(bg, hues.gray[dark ? 950 : 50].hex),
        fg: mix(bg, hues.gray[dark ? 700 : 300].hex),
        border: mix(bg, hues.gray[dark ? 900 : 100].hex),
        placeholder: mix(bg, hues.gray[dark ? 800 : 200].hex),
      }
    }

    if (state === 'readOnly') {
      return {
        bg: mix(bg, hues.gray[dark ? 950 : 50].hex),
        fg: mix(bg, hues.gray[dark ? 200 : 800].hex),
        border: mix(bg, hues.gray[dark ? 800 : 200].hex),
        placeholder: mix(bg, hues.gray[dark ? 600 : 400].hex),
      }
    }

    return {
      bg,
      fg,
      border,
      placeholder: mix(bg, hues.gray[dark ? 600 : 400].hex),
    }
  },

  selectable: ({base, muted, tone, solid, state}) => {
    const {bg} = base

    if (state === 'enabled') {
      return {...muted[tone].enabled, bg}
    }

    if (state === 'pressed') {
      if (tone === 'default') {
        return muted.primary.pressed
      }

      return muted[tone].pressed
    }

    if (state === 'selected') {
      if (tone === 'default') {
        return solid.primary.enabled
      }

      return solid[tone].enabled
    }

    if (state === 'disabled') {
      return {...muted[tone].disabled, bg}
    }

    return muted[tone][state]
  },

  spot: ({base, dark, key}) => {
    const mix = dark ? screen : multiply
    const {bg} = base

    return mix(bg, hues[key][dark ? 400 : 500].hex)
  },

  syntax: ({base, dark}) => {
    const mix = dark ? screen : multiply
    const {bg} = base
    const mainShade = dark ? 300 : 600
    const secondaryShade = dark ? 500 : 400

    return {
      atrule: mix(bg, hues.purple[mainShade].hex),
      attrName: mix(bg, hues.green[mainShade].hex),
      attrValue: mix(bg, hues.yellow[mainShade].hex),
      attribute: mix(bg, hues.yellow[mainShade].hex),
      boolean: mix(bg, hues.purple[mainShade].hex),
      builtin: mix(bg, hues.purple[mainShade].hex),
      cdata: mix(bg, hues.yellow[mainShade].hex),
      char: mix(bg, hues.yellow[mainShade].hex),
      class: mix(bg, hues.orange[mainShade].hex),
      className: mix(bg, hues.cyan[mainShade].hex),
      comment: mix(bg, hues.gray[secondaryShade].hex),
      constant: mix(bg, hues.purple[mainShade].hex),
      deleted: mix(bg, hues.red[mainShade].hex),
      doctype: mix(bg, hues.gray[secondaryShade].hex),
      entity: mix(bg, hues.red[mainShade].hex),
      function: mix(bg, hues.green[mainShade].hex),
      hexcode: mix(bg, hues.blue[mainShade].hex),
      id: mix(bg, hues.purple[mainShade].hex),
      important: mix(bg, hues.purple[mainShade].hex),
      inserted: mix(bg, hues.yellow[mainShade].hex),
      keyword: mix(bg, hues.magenta[mainShade].hex),
      number: mix(bg, hues.purple[mainShade].hex),
      operator: mix(bg, hues.magenta[mainShade].hex),
      prolog: mix(bg, hues.gray[secondaryShade].hex),
      property: mix(bg, hues.blue[mainShade].hex),
      pseudoClass: mix(bg, hues.yellow[mainShade].hex),
      pseudoElement: mix(bg, hues.yellow[mainShade].hex),
      punctuation: mix(bg, hues.gray[mainShade].hex),
      regex: mix(bg, hues.blue[mainShade].hex),
      selector: mix(bg, hues.red[mainShade].hex),
      string: mix(bg, hues.yellow[mainShade].hex),
      symbol: mix(bg, hues.purple[mainShade].hex),
      tag: mix(bg, hues.red[mainShade].hex),
      unit: mix(bg, hues.orange[mainShade].hex),
      url: mix(bg, hues.red[mainShade].hex),
      variable: mix(bg, hues.red[mainShade].hex),
    }
  },
})
