import {ColorHueConfig, ColorHueKey} from './types'

/**
 * @internal
 */
export interface ColorConfig {
  black: string
  white: string
  hues: Record<ColorHueKey, ColorHueConfig>
}

const FEATURE_WARM_GRAY = false

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
      stops: FEATURE_WARM_GRAY
        ? {
            0: white,
            555: '#8A7D7C',
            1000: black,
          }
        : {
            0: white,
            380: '#98A4AE', // Pantone 7543 C
            546: '#768692', // Pantone 7544 C
            750: '#425563', // Pantone 7545 C
            1000: black,
          },
    },
    red: {
      title: 'Red',
      stops: {
        0: white,
        300: '#FF959A',
        500: '#FF473C',
        559: '#F03E2F',
        1000: black,
      },
    },
    orange: {
      title: 'Orange',
      stops: {
        0: white,
        407: '#FB7D24',
        490: '#EE6300',
        621: '#BA550E',
        1000: black,
      },
    },
    yellow: {
      title: 'Yellow',
      stops: {
        0: white,
        216: '#E5C752',
        467: '#C38800',
        604: '#A26B00',
        1000: black,
      },
    },
    green: {
      title: 'Green',
      stops: {
        0: white,
        305: '#45D07D',
        // 490: '#00A54C',
        597: '#058959',
        1000: black,
      },
    },
    cyan: {
      title: 'Cyan',
      stops: {
        0: white,
        300: '#0CCBD7',
        465: '#00A4BA',
        599: '#00829D',
        1000: black,
      },
    },
    blue: {
      title: 'Blue',
      stops: {
        0: white,
        310: '#7ABEFC',
        577: '#2276FC',
        1000: black,
      },
    },
    purple: {
      title: 'Purple',
      stops: {
        0: white,
        390: '#db80fd',
        587: '#C123FC',
        1000: black,
      },
    },
    magenta: {
      title: 'Magenta',
      stops: {
        0: white,
        398: '#FF6DC3',
        504: '#FF3FB0',
        1000: black,
      },
    },
  },
}
