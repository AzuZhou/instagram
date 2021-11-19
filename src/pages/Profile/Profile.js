import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'

import Navbar from 'components/Navbar'
import ProfileInfo from 'components/ProfileInfo'

import { db } from 'firebaseConfig'

const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Profile = () => {
  const { username } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', username), (doc) => {
      if (doc.exists()) {
        setUser({ ...doc.data() })
      } else {
        // TODO: redirect 404 or home
        console.log('No such document!')
      }
    })

    return () => unsub()
  }, [])

  return (
    <Container>
      <Navbar />
      <ProfileInfo {...user} username={username} />
    </Container>
  )
}

export default Profile
