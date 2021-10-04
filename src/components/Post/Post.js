import styled from 'styled-components'

import Comment from '../shared/Comment'
import Image1 from 'images/image1.jpeg'
import { ReactComponent as OutlinedLike } from 'icons/like_outlined.svg'
import { ReactComponent as OutlinedComment } from 'icons/comment_outlined.svg'
import { ReactComponent as OutlinedShare } from 'icons/share_outlined.svg'

const Container = styled.article`
  width: 500px;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  > div ~ div {
    margin-top: 20px;
  }
`
const Media = styled.div`
  width: 100%;
  height: 500px;
  display: flex;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const Actions = styled.div`
  > svg ~ svg {
    margin-left: 15px;
  }
`
const Caption = styled.div`
  width: 100%;
`

const Post = () => (
  <Container>
    <Media>
      <img src={Image1} alt="desciption" />
    </Media>

    <Actions>
      <OutlinedLike />
      <OutlinedComment />
      <OutlinedShare />
    </Actions>

    <Caption>
      <Comment />
    </Caption>
  </Container>
)

export default Post
