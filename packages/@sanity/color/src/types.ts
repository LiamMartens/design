/**
 * @public
 */
export interface ColorHueConfig {
  /**
   * @deprecated
   */
  darkest?: string

  /**
   * @deprecated
   */
  mid?: string

  /**
   * @deprecated
   */
  lightest?: string

  /**
   * @deprecated
   */
  midPoint?: number

  title: string

  /**
   * @beta
   */
  stops?: Partial<Record<string, string>>
}

/**
 * @public
 */
export interface ColorValue {
  hex: string
  title: string
  contrast: {
    onBlack: number
    onWhite: number
  }
}

/**
 * @public
 */
export type ColorTintKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950'

/**
 * @public
 */
export type ColorTints = {
  [key in ColorTintKey]: ColorValue
}

/**
 * @public
 */
export type ColorHueKey =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'magenta'

/**
 * @public
 */
export interface ColorPalette {
  // Color values
  black: ColorValue
  white: ColorValue

  // Color tints
  gray: ColorTints
  red: ColorTints
  orange: ColorTints
  yellow: ColorTints
  green: ColorTints
  cyan: ColorTints
  blue: ColorTints
  purple: ColorTints
  magenta: ColorTints
}
