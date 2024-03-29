import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import styled from 'styled-components'
import { Box, Input, Button } from '@mui/material'
import { doc, setDoc } from 'firebase/firestore'

import { auth, db } from 'firebaseConfig'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3px',
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
    height: 200px;

    display: inherit;
    flex-direction: inherit;
    justify-content: space-evenly;
  }
`

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: username,
        })

        const newUser = {
          id: userCredential.user.uid,
          profilePicture: '',
          posts: [],
          followers: [],
          following: [],
          postCount: 0,
          followerCount: 0,
          followingCount: 0,
          name: '',
          bio: '',
          website: '',
        }

        setDoc(doc(db, 'users', username), newUser)
      })
      .catch((error) => {
        console.log(`ERROR ${error.code} ${error.message}`)
      })
  }

  return (
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
        <Button onClick={handleSignUp}>sign up</Button>
      </Form>
    </Box>
  )
}

export default SignUp
