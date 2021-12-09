import styled from 'styled-components'

import Navbar from 'components/Navbar'

import { COLORS } from 'styles/constants'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  background-color: ${COLORS.backgroundWhite};
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Layout = ({ children }) => (
  <Container>
    <Navbar />
    <Main>{children}</Main>
  </Container>
)

export default Layout
