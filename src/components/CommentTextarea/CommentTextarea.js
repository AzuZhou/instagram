import { useState, forwardRef } from 'react'
import styled from 'styled-components'

import { doc, addDoc, updateDoc, increment, collection, serverTimestamp } from 'firebase/firestore'

import { db, auth } from 'firebaseConfig'

import { COLORS } from 'styles/constants'

const Container = styled.form`
  width: 100%;
  padding: 6px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid ${COLORS.dividerGrey};

  textarea {
    width: inherit;
    padding: 8px 0;

    border: none;
  }

  button {
    margin-left: 4px;

    color: ${COLORS.blue};
    font-weight: bold;

    &:disabled {
      opacity: 0.3;
    }
  }
`

const CommentTextarea = forwardRef(({ postId }, ref) => {
  const [comment, setComment] = useState('')

  const handleChange = ({ target: { value } }) => setComment(value)

  const handleSubmit = (e) => {
    e.preventDefault()

    addDoc(collection(db, 'posts', postId, 'comments'), {
      username: auth.currentUser.displayName,
      text: comment,
      timestamp: serverTimestamp(),
    })

    const postRef = doc(db, 'posts', postId)

    updateDoc(postRef, {
      commentCount: increment(1),
    })

    setComment('')
  }

  return (
    <Container onSubmit={handleSubmit}>
      <textarea
        ref={ref}
        aria-label="Add a comment..."
        placeholder="Add a comment..."
        autoComplete="off"
        autoCorrect="off"
        rows="1"
        value={comment}
        onChange={handleChange}
      />
      <button type="submit" disabled={!comment}>
        Post
      </button>
    </Container>
  )
})

export default CommentTextarea
