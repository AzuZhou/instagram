import styled from 'styled-components'

const Container = styled.p`
  text-align: left;
`

const Commenter = styled.a`
  margin-right: 10px;
  font-weight: bold;
  text-decoration: none;
  color: indigo;
`
const Comment = () => (
  <Container>
    <Commenter href="#">azu.zhou</Commenter>
    This is a comment. This is a comment. This is a comment. This is a comment. This is a comment.
    This is a comment. This is a comment. This is a comment.
  </Container>
)

export default Comment
