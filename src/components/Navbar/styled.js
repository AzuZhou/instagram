import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { maxWidth, padding, mobileQuery } from 'styles/styles'
import { COLORS } from 'styles/constants'

const Container = styled.header`
  position: fixed;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;

  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.lightGrey};

  > nav {
    height: 54px;
    width: 100%;
    ${maxWidth}
    ${padding}
      
    display: inherit;
    justify-content: space-between;
    align-items: center;
  }
`

const Logo = styled(Link)`
  height: 36px;

  img {
    height: 100%;
    padding-top: 7px;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`

const AddPost = styled(Link)`
  display: flex;
`

const NavbarSpace = styled.div`
  height: 55px;

  ${mobileQuery} {
    margin-bottom: 30px;
  }
`

export { Container, Logo, NavbarSpace, Actions, AddPost }
