import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'

import Layout from 'components/shared/Layout'
import ProfileInfo from 'components/ProfileInfo'

import { db } from 'firebaseConfig'

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
  }, [username])

  return (
    <Layout>
      <ProfileInfo {...user} username={username} />
    </Layout>
  )
}

export default Profile
