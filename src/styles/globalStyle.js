import { createGlobalStyle } from 'styled-components'

import { COLORS, FONT_SIZES } from './constants'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    font-family: 'Noto Sans Display', sans-serif;
    color: ${COLORS.black};
  }

  body {
    margin: 0;
  }
  
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  h1 {
    font-size: ${FONT_SIZES.title}
  }

  a {
    text-decoration: none;
    cursor: pointer;

    &:visited, &:active, &:focus {
      color: initial;
    }
  }

  textarea {
  resize: none;
}
`

export default GlobalStyle
