import { useState, useEffect } from 'react'
import { onSnapshot, collection, query, orderBy, doc, getDoc } from 'firebase/firestore'

import Comment from '../shared/Comment'
import CommentTextarea from '../CommentTextarea'

import { db } from 'firebaseConfig'

import { ReactComponent as OutlinedLike } from 'icons/like_outlined.svg'
import { ReactComponent as OutlinedComment } from 'icons/comment_outlined.svg'
import { ReactComponent as OutlinedShare } from 'icons/share_outlined.svg'

import {
  Container,
  Header,
  ProfilePicture,
  UserName,
  Media,
  Actions,
  Caption,
  Comments,
  CommentSection,
} from './styled'

// TODO: add profile link
// TODO: add post options (...)
// TODO: add likes obj with total and likes, inside likes {userId: {username: 'username'}, userId: {username: 'username'}}
// TODO: limit caption length and comments shown
// TODO: add like and coment functionality

const Post = ({ username, fileUrl, caption, id }) => {
  const [profilePicture, setProfilePicture] = useState([])
  const [comments, setComments] = useState([])

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

    const postRef = collection(db, 'posts', id, 'comments')
    const q = query(postRef, orderBy('timestamp', 'desc'))

    const unsub = onSnapshot(q, (querySnapshot) => {
      let comments = []
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id })
      })
      setComments(comments)
    })

    return () => unsub()
  }, [])

  return (
    <Container>
      <Header>
        <ProfilePicture>
          {profilePicture && <img src={profilePicture} alt={username} />}
        </ProfilePicture>
        <UserName>{username}</UserName>
      </Header>

      <Media>
        <img src={fileUrl} alt="desciption" />
      </Media>

      <Actions>
        <OutlinedLike />
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

        <CommentTextarea postId={id} />
      </CommentSection>
    </Container>
  )
}
export default Post
