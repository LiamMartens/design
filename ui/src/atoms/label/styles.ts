import {css} from 'styled-components'
import {Theme, ThemeFontSize} from '../../theme'
import {rem} from '../helpers'

export function labelBaseStyles(props: {theme: Theme}) {
  const {theme} = props

  return css`
    position: relative;
    font-family: ${theme.fonts.label.family};
    font-weight: ${theme.fonts.label.weights.semibold};
    display: block;
    padding: 1px 0 0;
    margin: 0;

    &:before {
      content: '';
      display: block;
      height: 0;
    }

    & code {
      font-family: ${theme.fonts.code.family};
      border-radius: 2px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }

    & svg {
      vertical-align: baseline;
    }
  `
}

function _labelSizeStyles(size: ThemeFontSize) {
  const capHeight = size.lineHeight - size.ascenderHeight - size.descenderHeight

  return css`
    font-size: ${rem(size.fontSize)};
    line-height: ${rem(size.lineHeight)};
    letter-spacing: ${rem(size.letterSpacing)};
    text-transform: uppercase;
    transform: translateY(${rem(size.descenderHeight)});

    &:before {
      margin-top: ${rem(-1 - size.ascenderHeight - size.descenderHeight)};
    }

    & svg {
      font-size: ${rem(size.iconSize)};
      margin: ${rem((capHeight - size.iconSize) / 2)};
    }
  `
}

export function labelSizeStyles(props: {size: number[]; theme: Theme}) {
  const {sizes} = props.theme.fonts.label

  return css`
    ${props.size.map((spaceIndex, mqIndex) => {
      if (mqIndex === 0) {
        return _labelSizeStyles(sizes[spaceIndex])
      }

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          ${_labelSizeStyles(sizes[spaceIndex])}
        }
      `
    })}
  `
}