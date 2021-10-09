import styled from 'styled-components'
import Navbar from 'components/Navbar'
import Feed from 'components/Feed'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NavbarSpace = styled.div`
  height: 55px;
`

const Home = () => (
  <Container>
    <Navbar />
    <NavbarSpace />

    <Feed />
  </Container>
)

export default Home
