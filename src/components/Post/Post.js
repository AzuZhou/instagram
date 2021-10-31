import styled from 'styled-components'

import Comment from '../shared/Comment'
import { COLORS } from 'styles/constants'

import { ReactComponent as OutlinedLike } from 'icons/like_outlined.svg'
import { ReactComponent as OutlinedComment } from 'icons/comment_outlined.svg'
import { ReactComponent as OutlinedShare } from 'icons/share_outlined.svg'

const Container = styled.article`
  width: 500px;
  margin-bottom: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  border: 1px solid ${COLORS.lightGrey};
  border-radius: 3px;
`

const Header = styled.div`
  width: 100%;
  padding: 14px 16px;

  display: inherit;

  border-bottom: 1px solid ${COLORS.lightGrey};
`

const ProfilePicture = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: ${COLORS.lightGrey};

  > img {
    width: 100%;
    object-fit: cover;
  }
`

const UserName = styled.div`
  margin-left: 14px;
  font-weight: bold;

  display: flex;
  align-items: center;
`

const Media = styled.div`
  width: 100%;
  height: 500px;
  margin-bottom: 10px;

  display: flex;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Actions = styled.div`
  margin-bottom: 8px;
  padding: 0 16px;

  > svg ~ svg {
    margin-left: 15px;
  }
`

const Caption = styled.div`
  width: 100%;
  padding: 0 16px;
`

// TODO: add profile link
// TODO: add post options (...)
// TODO: add likes
// TODO: add comments
// TODO: limit caption length and comments shown
// TODO: add like and coment functionality

const Post = ({ userName, profilePicture, fileUrl, caption }) => (
  <Container>
    <Header>
      <ProfilePicture>
        {profilePicture && <img src={profilePicture} alt={userName} />}
      </ProfilePicture>
      <UserName>{userName}</UserName>
    </Header>

    <Media>
      <img src={fileUrl} alt="desciption" />
    </Media>

    <Actions>
      <OutlinedLike />
      <OutlinedComment />
      <OutlinedShare />
    </Actions>

    <Caption>
      <Comment userName={userName} text={caption} />
    </Caption>
  </Container>
)

export default Post
