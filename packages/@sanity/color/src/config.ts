import {ColorHueConfig, ColorHueKey} from './types'

/**
 * @internal
 */
export interface ColorConfig {
  black: string
  white: string
  hues: Record<ColorHueKey, ColorHueConfig>
}

/**
 * @internal
 */
export const white = '#ffffff'

/**
 * @internal
 */
export const black = '#101820'

/**
 * @internal
 */
export const config: ColorConfig = {
  black,
  white,
  hues: {
    gray: {
      title: 'Gray',
      stops: {
        0: white,
        300: '#B0BAC6',
        600: '#5c697c',
        1000: black,
      },
    },
    red: {
      title: 'Red',
      stops: {
        0: white,
        300: '#F68D93',
        550: '#F03E2F',
        1000: black,
      },
    },
    orange: {
      title: 'Orange',
      stops: {
        0: white,
        375: '#FB7D24',
        600: '#BA550E',
        1000: black,
      },
    },
    yellow: {
      title: 'Yellow',
      stops: {
        0: white,
        200: '#FFCC00',
        550: '#A26B00',
        // 800: '#53391A',
        1000: black,
      },
    },
    green: {
      title: 'Green',
      stops: {
        0: white,
        300: '#43D675',
        600: '#068849',
        1000: black,
      },
    },
    cyan: {
      title: 'Cyan',
      stops: {
        0: white,
        275: '#22DAF4',
        600: '#078294',
        1000: black,
      },
    },
    blue: {
      title: 'Blue',
      stops: {
        0: white,
        300: '#7ABEFC',
        500: '#2276FC',
        1000: black,
      },
    },
    purple: {
      title: 'Purple',
      stops: {
        0: white,
        500: '#C123FC',
        1000: black,
      },
    },
    magenta: {
      title: 'Magenta',
      stops: {
        0: white,
        300: '#FF6DC3',
        500: '#E5389E',
        1000: black,
      },
    },
  },
}
