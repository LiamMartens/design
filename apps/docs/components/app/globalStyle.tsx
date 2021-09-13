import {Theme} from '@sanity/ui'
import {createGlobalStyle, css} from 'styled-components'

export const GlobalStyle = createGlobalStyle((props: {theme: Theme}) => {
  const {theme} = props
  const color = theme.sanity.color.base

  return css`
    html {
      text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
    }

    html,
    body,
    #__next {
      height: 100%;
    }

    html {
      background-color: ${color.bg};
    }

    body {
      -webkit-font-smoothing: antialiased;
      margin: 0;
    }

    #__next {
      color: ${color.fg};
    }
  `
})
