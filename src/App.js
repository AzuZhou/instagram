import Home from './pages/Home'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans Display', sans-serif;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;

    &:visited, &:active, &:focus {
      color: initial;
    }
    
  }
`

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Home />
    </div>
  )
}

export default App
