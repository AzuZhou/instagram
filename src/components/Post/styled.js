import styled from 'styled-components'

import { COLORS } from 'styles/constants'

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

  svg ~ svg {
    margin-left: 15px;
  }
`

const Comments = styled.div`
  width: 100%;
`
const Caption = styled.div`
  width: 100%;
`

const CommentSection = styled.div`
  width: 100%;
  padding: 0 16px;
`

export {
  Container,
  Header,
  ProfilePicture,
  UserName,
  Media,
  Actions,
  CommentSection,
  Caption,
  Comments,
}
