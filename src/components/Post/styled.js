import styled from 'styled-components'

import { COLORS } from 'styles/constants'
import { mobileQuery } from 'styles/styles'

const Container = styled.article`
  max-width: 500px;
  width: 100%;
  margin-bottom: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  background-color: ${COLORS.white};

  ${mobileQuery} {
    border: 1px solid ${COLORS.lightGrey};
    border-radius: 3px;
  }
`

const Header = styled.div`
  width: 100%;
  padding: 14px 16px;

  display: inherit;

  border-bottom: 1px solid ${COLORS.dividerGrey};
`

const UserName = styled.span`
  margin-left: 14px;
  font-weight: bold;

  display: flex;
  align-items: center;

  transition: text-decoration 0.1s linear;

  &:hover {
    text-decoration: underline;
  }
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
  padding: 4px 16px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;

  button {
    display: inline-flex;

    svg {
      transition: fill 0.1s linear;

      &:not([aria-label='Unlike']):hover {
        fill: ${COLORS.textGrey};
      }
    }
  }
`

const Comments = styled.div`
  width: 100%;
  padding: 0 16px;
`
const Caption = styled.div`
  width: 100%;
`

const CommentSection = styled.div`
  width: 100%;
`

export { Container, Header, UserName, Media, Actions, CommentSection, Caption, Comments }
