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
        515: '#7E8993',
        // 299: '#B0BAC6',
        // 600: '#5c697c',
        1000: black,
      },
    },
    red: {
      title: 'Red',
      stops: {
        0: white,
        368: '#F68D93',
        546: '#F03E2F',
        1000: black,
      },
    },
    orange: {
      title: 'Orange',
      stops: {
        0: white,
        407: '#FB7D24',
        606: '#BA550E',
        1000: black,
      },
    },
    yellow: {
      title: 'Yellow',
      stops: {
        0: white,
        190: '#FFCC00',
        591: '#A26B00',
        // 800: '#53391A',
        1000: black,
      },
    },
    green: {
      title: 'Green',
      stops: {
        0: white,
        287: '#43D675',
        590: '#068849',
        1000: black,
      },
    },
    cyan: {
      title: 'Cyan',
      stops: {
        0: white,
        240: '#22DAF4',
        590: '#078294',
        1000: black,
      },
    },
    blue: {
      title: 'Blue',
      stops: {
        0: white,
        310: '#7ABEFC',
        563: '#2276FC',
        1000: black,
      },
    },
    purple: {
      title: 'Purple',
      stops: {
        0: white,
        390: '#db80fd',
        575: '#C123FC',
        1000: black,
      },
    },
    magenta: {
      title: 'Magenta',
      stops: {
        0: white,
        398: '#FF6DC3',
        548: '#E5389E',
        1000: black,
      },
    },
  },
}
