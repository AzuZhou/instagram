import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth'
import styled from 'styled-components'
import { Modal, Box, Input, Button } from '@mui/material'

import Home from './pages/Home'
import Post from './pages/Post'

import { auth } from 'firebaseConfig'

import GlobalStyle from 'styles/globalStyle'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin-bottom: 10px;
  }

  > div {
    height: 120px;

    display: inherit;
    flex-direction: inherit;
    justify-content: space-evenly;
  }
`

const App = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    handleOpen()
  }, [])

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

  const signUp = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: username,
        })
      })
      .catch((error) => {
        console.log(`ERROR ${error.code} ${error.message}`)
      })
  }

  // TODO: Modal hook
  // TODO: Move Navbar here

  return (
    <Router>
      <div>
        <GlobalStyle />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Form>
              <h1>Instagram</h1>
              <div>
                <Input
                  type="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button onClick={signUp}>sign up</Button>
            </Form>
          </Box>
        </Modal>

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
