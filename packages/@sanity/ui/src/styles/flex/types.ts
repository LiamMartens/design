import {FlexAlign, FlexDirection, FlexJustify, FlexValue, FlexWrap} from '../../types'

/**
 * @internal
 */
export interface ResponsiveFlexStyleProps {
  $align?: FlexAlign | FlexAlign[]
  $direction?: FlexDirection | FlexDirection[]
  $gap?: number | number[]
  $justify?: FlexJustify | FlexJustify[]
  $wrap?: FlexWrap | FlexWrap[]
}

/**
 * @internal
 */
export interface ResponsiveFlexItemStyleProps {
  $flex?: FlexValue | FlexValue[]
}

/**
 * @internal
 */
export interface FlexItemStyleProps extends ResponsiveFlexItemStyleProps {}
