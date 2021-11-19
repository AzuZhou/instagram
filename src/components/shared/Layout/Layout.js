import styled from 'styled-components'

import Navbar from 'components/Navbar'

const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Layout = ({ children }) => (
  <Container>
    <Navbar />
    {children}
  </Container>
)

export default Layout
