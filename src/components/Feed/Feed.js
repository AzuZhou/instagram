import { useState } from 'react'
import styled from 'styled-components'
import Post from '../Post'

import { padding } from 'styles/styles'

const Container = styled.section`
  max-width: 600px;
  ${padding}
`

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633804317365-52ba030f8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
      caption: 'I am caption',
    },
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633860757847-acd18550ec39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1856&q=80',
      caption: 'I am caption',
    },
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633805711783-d1b8c16e4c04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=908&q=80',
      caption: 'I am caption',
    },
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633813122125-882b7cba1f7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
      caption: 'I am caption',
    },
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633801695482-f3a98465b84b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
      caption: 'I am caption',
    },
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633872880116-f19a8e012bfe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
      caption: 'I am caption',
    },
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633850012980-feb80a7add39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
      caption: 'I am caption',
    },
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633687044521-bd06e98625d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
      caption: 'I am caption',
    },
    {
      userName: 'azu.zhou',
      profilePicture: '',
      imageUrl:
        'https://images.unsplash.com/photo-1633804305751-1d6ee641847f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
      caption: 'I am caption',
    },
  ])

  return (
    <Container>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </Container>
  )
}

export default Feed
