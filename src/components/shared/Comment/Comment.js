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

const Comment = ({ userName, text }) => (
  <Container>
    <Commenter href="#">{userName}</Commenter>
    {text}
  </Container>
)

export default Comment
