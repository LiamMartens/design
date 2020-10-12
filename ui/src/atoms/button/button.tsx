import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {Box, BoxPaddingProps} from '../box'
import {Text} from '../text'
import {Icon, IconSymbol} from '../icon'
import {buttonBaseStyles, buttonColorStyles} from './styles'
import {ButtonMode, ButtonTone} from './types'

export interface ButtonProps extends BoxPaddingProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  mode?: ButtonMode
  tone?: ButtonTone
  icon?: IconSymbol
  size?: number | number[]
  type?: 'button' | 'reset' | 'submit'
}

const Root = styled.button(buttonBaseStyles, buttonColorStyles)

const TextContainer = styled.span`
  svg + & {
    margin-left: 0.75em;
  }
`

export const Button = forwardRef(
  (props: ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>, ref) => {
    const {
      children,
      disabled,
      mode = 'default',
      padding = 3,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      size,
      tone = 'default',
      icon,
      ...restProps
    } = props

    const boxProps = {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }

    return (
      <Root
        data-ui="Button"
        {...restProps}
        data-disabled={disabled}
        disabled={disabled}
        mode={mode}
        ref={ref}
        tone={tone}
      >
        <Box as="span" {...boxProps}>
          {(icon || children) && (
            <Text as="span" size={size}>
              {icon && <Icon symbol={icon} />}
              {children && <TextContainer>{children}</TextContainer>}
            </Text>
          )}
        </Box>
      </Root>
    )
  }
)

Button.displayName = 'Button'