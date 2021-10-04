import styled from 'styled-components'
import Post from '../Post'

const Container = styled.section`
  max-width: 600px;
`
const Feed = () => (
  <Container>
    <Post />
  </Container>
)

export default Feed
