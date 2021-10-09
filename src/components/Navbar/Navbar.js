import styled from 'styled-components'

import { maxWidth, padding } from 'styles/styles'
import { COLORS } from 'styles/constants'

const Container = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;

  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.lightGrey};

  > div {
    height: 54px;
    width: 100%;
    ${maxWidth}
    ${padding}
      
    display: inherit;
    justify-content: space-between;
    align-items: center;
  }
`

const Logo = styled.a``
const User = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background-color: grey;
`

const NavbarSpace = styled.div`
  height: 55px;
`

const Navbar = () => (
  <>
    <Container>
      <div>
        <Logo href="#">
          <h1>Instagram</h1>
        </Logo>
        <User />
      </div>
    </Container>
    <NavbarSpace />
  </>
)

export default Navbar
