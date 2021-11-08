import { useState } from 'react'
import styled from 'styled-components'

import { addDoc, collection, Timestamp } from 'firebase/firestore'

import { db, auth } from 'firebaseConfig'

const Container = styled.form`
  width: 100%;
  padding: 8px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  textarea {
    width: inherit;
    padding: 8px 0;

    border: none;
  }
`

const CommentTextarea = ({ postId }) => {
  const [comment, setComment] = useState('')

  const handleChange = ({ target: { value } }) => setComment(value)

  const handleSubmit = (e) => {
    e.preventDefault()

    addDoc(collection(db, 'posts', postId, 'comments'), {
      username: auth.currentUser.displayName,
      text: comment,
      timestamp: Timestamp.now(),
    })

    setComment('')
  }

  return (
    <Container onSubmit={handleSubmit}>
      <textarea
        aria-label="Add a comment..."
        placeholder="Add a comment..."
        autoComplete="off"
        autoCorrect="off"
        rows="1"
        value={comment}
        onChange={handleChange}
      />
      <button type="submit">Post</button>
    </Container>
  )
}

export default CommentTextarea
