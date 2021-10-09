import styled from 'styled-components'
import Navbar from 'components/Navbar'
import Feed from 'components/Feed'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => (
  <Container>
    <Navbar />
    <Feed />
  </Container>
)

export default Home
