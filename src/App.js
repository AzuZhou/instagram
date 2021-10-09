import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Post from './pages/Post'

import GlobalStyle from 'styles/globalStyle'

const App = () => {
  return (
    <Router>
      <div>
        <GlobalStyle />

        <Switch>
          <Route path="/post">
            <Post />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
