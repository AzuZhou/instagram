import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import PrivateRoute from 'components/PrivateRoute'
import PublicRoute from 'components/PublicRoute'
import Home from 'pages/Home'
import Post from 'pages/Post'
import LogIn from 'pages/LogIn'
import SignUp from 'pages/SignUp'

import { auth } from 'firebaseConfig'

import GlobalStyle from 'styles/globalStyle'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // this listener keeps the user logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user: ', user)
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [user])

  return (
    <Router>
      <div>
        <GlobalStyle />
        <Switch>
          <PublicRoute exact path="/log-in" isAuthenticated={user}>
            <LogIn />
          </PublicRoute>
          <PublicRoute exact path="/sign-up" isAuthenticated={user}>
            <SignUp />
          </PublicRoute>

          <PrivateRoute exact path="/" isAuthenticated={user}>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/post" isAuthenticated={user}>
            <Post />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App
