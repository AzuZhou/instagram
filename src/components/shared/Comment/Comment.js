import styled from 'styled-components'

const Container = styled.p`
  text-align: left;
  margin-bottom: 4px;
`

const Commenter = styled.a`
  margin-right: 8px;
  font-weight: bold;
  text-decoration: none;
`

// TODO: add profile link
// TODO: delete comment, change commentCount
// TODO: like comment functionality

const Comment = ({ username, text }) => (
  <Container>
    <Commenter href="#">{username}</Commenter>
    {text}
  </Container>
)

export default Comment
