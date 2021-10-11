import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { collection, getDocs } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import Post from '../Post'

import { db } from 'firebaseConfig'

import { padding } from 'styles/styles'

const Container = styled.section`
  max-width: 600px;
  ${padding}
`

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const postList = await getDocs(collection(db, 'posts'))
      setPosts(postList.docs.map((doc) => ({ ...doc.data(), id: uuidv4() })))
    }

    getPosts()
  }, [])

  return (
    <Container>
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </Container>
  )
}

export default Feed
