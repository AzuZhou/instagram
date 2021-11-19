import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { Popover } from '@mui/material'

import { auth } from 'firebaseConfig'

import { ProfilePicture } from 'styles/styles'

import { Container, Logo, User, NavbarSpace, PopoverLinks, PopoverLink } from './styled'

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
            <ProfilePicture size="22px" />
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
