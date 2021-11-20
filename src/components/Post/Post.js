import { useState, useEffect } from 'react'
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

import { ReactComponent as OutlinedLike } from 'icons/like_outlined.svg'
import { ReactComponent as OutlinedComment } from 'icons/comment_outlined.svg'
import { ReactComponent as OutlinedShare } from 'icons/share_outlined.svg'

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

// TODO: add profile link
// TODO: add post options (...)
// TODO: limit caption length and comments shown

const Post = ({ username, fileUrl, caption, id, timestamp }) => {
  const [profilePicture, setProfilePicture] = useState([])
  const [comments, setComments] = useState([])

  // TODO:  reuse handleLink for comments
  const handleLike = async () => {
    const postRef = doc(db, 'posts', id)
    const docSnap = await getDoc(postRef)

    if (docSnap.exists()) {
      if (docSnap.data().likes.includes(auth.currentUser.displayName)) {
        updateDoc(postRef, {
          likes: arrayRemove(auth.currentUser.displayName),
          likeCount: increment(-1),
        })
      } else {
        updateDoc(postRef, {
          likes: arrayUnion(auth.currentUser.displayName),
          likeCount: increment(1),
        })
      }
    } else {
      console.log('No such document!')
    }
  }

  useEffect(() => {
    const getProfilePicture = async () => {
      const userRef = doc(db, 'users', username)
      const docSnap = await getDoc(userRef)

      if (docSnap.exists()) {
        setProfilePicture(docSnap.data().profilePicture)
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    }

    getProfilePicture()

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
  }, [username, id])

  return (
    <Container>
      <Header>
        <ProfilePicture size="32px">
          {profilePicture && <img src={profilePicture} alt={username} />}
        </ProfilePicture>
        <UserName>{username}</UserName>
      </Header>

      <Media>
        <img src={fileUrl} alt="desciption" />
      </Media>

      <Actions>
        <button onClick={handleLike}>
          <OutlinedLike />
        </button>
        <OutlinedComment />
        <OutlinedShare />
      </Actions>

      <CommentSection>
        <Comments>
          <Caption>
            <Comment username={username} text={caption} />
          </Caption>
          {comments && comments.map(({ id, ...props }) => <Comment key={id} {...props} />)}
        </Comments>

        <Creation timestamp={timestamp} />

        <CommentTextarea postId={id} />
      </CommentSection>
    </Container>
  )
}
export default Post
