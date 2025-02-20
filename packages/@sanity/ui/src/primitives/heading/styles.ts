import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {HeadingStyleProps} from './types'

export function headingBaseStyle(
  props: HeadingStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {$accent, $muted, theme} = props

  return css`
    ${$accent &&
    css`
      color: var(--card-accent-fg-color);
    `}

    ${$muted &&
    css`
      color: var(--card-muted-fg-color);
    `}

    & code {
      font-family: ${theme.sanity.fonts.code.family};
      border-radius: 1px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
      color: var(--card-link-color);
      outline: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
