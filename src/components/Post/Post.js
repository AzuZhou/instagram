import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from 'firebase/firestore'

import Comment from '../shared/Comment'
import CommentTextarea from '../CommentTextarea'
import Creation from '../Creation'

import { db, auth } from 'firebaseConfig'
import { useProfilePicture } from 'utils/hooks'

import { ReactComponent as OutlinedLike } from 'icons/like.svg'
import { ReactComponent as FilledUnlike } from 'icons/unlike.svg'
import { ReactComponent as OutlinedComment } from 'icons/comment.svg'
import { ReactComponent as OutlinedShare } from 'icons/share.svg'

import { ProfilePicture } from 'styles/styles'

import {
  Container,
  Header,
  UserName,
  Media,
  Actions,
  Caption,
  Comments,
  CommentSection,
} from './styled'

// TODO: add post options (...)
// TODO: limit caption length and comments shown

const Post = ({ username, fileUrl, caption, id, timestamp }) => {
  const [profilePicture, getProfilePicture] = useProfilePicture(username)
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(false)
  const textareaRef = useRef(null)

  const handleLike = async () => {
    const postRef = doc(db, 'posts', id)
    const docSnap = await getDoc(postRef)

    if (docSnap.exists()) {
      if (docSnap.data().likes.includes(auth.currentUser.displayName)) {
        updateDoc(postRef, {
          likes: arrayRemove(auth.currentUser.displayName),
          likeCount: increment(-1),
        })

        setLiked(false)
      } else {
        updateDoc(postRef, {
          likes: arrayUnion(auth.currentUser.displayName),
          likeCount: increment(1),
        })

        setLiked(true)
      }
    } else {
      console.log('No such document!')
    }
  }

  const handleComment = () => {
    textareaRef.current.focus()
  }

  useEffect(() => {
    const commentsRef = collection(db, 'posts', id, 'comments')
    const q = query(commentsRef, orderBy('timestamp', 'desc'))

    const unsub = onSnapshot(q, (querySnapshot) => {
      let comments = []
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id })
      })
      setComments(comments)
    })

    return () => unsub()
  }, [id])

  useEffect(() => {
    getProfilePicture()
  }, [])

  return (
    <Container>
      <Header>
        <ProfilePicture size="32px" img={profilePicture} />
        <UserName>
          <Link to={`/${username}`}>{username}</Link>
        </UserName>
      </Header>

      <Media>
        <img src={fileUrl} alt="" />
      </Media>

      <Actions>
        <button onClick={handleLike}>{liked ? <FilledUnlike /> : <OutlinedLike />}</button>
        <button onClick={handleComment}>
          <OutlinedComment />
        </button>
        <button>
          <OutlinedShare />
        </button>
      </Actions>

      <CommentSection>
        <Comments>
          <Caption>
            <Comment username={username} text={caption} />
          </Caption>
          {comments && comments.map(({ id, ...props }) => <Comment key={id} {...props} />)}
        </Comments>

        <Creation timestamp={timestamp} />

        <CommentTextarea postId={id} ref={textareaRef} />
      </CommentSection>
    </Container>
  )
}
export default Post
