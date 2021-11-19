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

const User = styled.button`
  height: 100%;
  border: none;
  background-color: transparent;
`

const NavbarSpace = styled.div`
  height: 55px;

  margin-bottom: 30px;
`

const PopoverLinks = styled.div`
  padding: 10px;
`

const PopoverLink = styled.button`
  border: none;
  background-color: transparent;
`

export { Container, Logo, User, NavbarSpace, PopoverLinks, PopoverLink }
