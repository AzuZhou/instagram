import styled from 'styled-components'
import Post from '../Post'

import { padding } from 'styles/styles'

const Container = styled.section`
  max-width: 600px;
  ${padding}
`
const Feed = () => (
  <Container>
    <Post />
  </Container>
)

export default Feed
