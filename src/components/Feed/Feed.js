import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

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
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
      const postList = await getDocs(q)
      setPosts(postList.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
