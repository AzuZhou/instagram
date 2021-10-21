import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import CircularProgress from '@mui/material/CircularProgress'

import PrivateRoute from 'components/PrivateRoute'
import PublicRoute from 'components/PublicRoute'

import { auth } from 'firebaseConfig'

import GlobalStyle from 'styles/globalStyle'

const Home = lazy(() => import('pages/Home'))
const Post = lazy(() => import('pages/Post'))
const LogIn = lazy(() => import('pages/LogIn'))
const SignUp = lazy(() => import('pages/SignUp'))

const App = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // this listener keeps the user logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  return (
    <>
      <GlobalStyle />
      <Router>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Suspense fallback={<CircularProgress />}>
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
          </Suspense>
        )}
      </Router>
    </>
  )
}

export default App
