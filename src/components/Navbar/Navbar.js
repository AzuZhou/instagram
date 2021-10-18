import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { Popover } from '@mui/material'
import styled from 'styled-components'

import { auth } from 'firebaseConfig'

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

const ProfilePicture = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background-color: ${COLORS.lightGrey};
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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleLogOut = () => {
    signOut(auth).catch((error) => {
      console.log(`ERROR ${error.code} ${error.message}`)
    })
  }

  return (
    <>
      <Container>
        <div>
          <Logo href="#">
            <h1>Instagram</h1>
          </Logo>

          <User aria-describedby={id} onClick={handlePopoverClick}>
            <ProfilePicture />
          </User>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <PopoverLinks>
              <PopoverLink onClick={handleLogOut}>Log Out</PopoverLink>
            </PopoverLinks>
          </Popover>
        </div>
      </Container>
      <NavbarSpace />
    </>
  )
}

export default Navbar
