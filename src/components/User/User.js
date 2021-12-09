import styled from 'styled-components'
import { signOut } from 'firebase/auth'
import { Popover } from '@mui/material'

import { auth } from 'firebaseConfig'
import { usePopover } from 'utils/hooks'

const PopoverLinks = styled.div`
  padding: 10px;
`

const PopoverLink = styled.button`
  border: none;
  background-color: transparent;
`

const Container = styled.button`
  height: 100%;
  border: none;
  background-color: transparent;
`

const User = ({ children }) => {
  const { id, open, anchorEl, handlePopoverClick, handlePopoverClose } = usePopover()

  const handleLogOut = () => {
    signOut(auth).catch((error) => {
      console.log(`ERROR ${error.code} ${error.message}`)
    })
  }

  return (
    <>
      <Container aria-describedby={id} onClick={handlePopoverClick}>
        {children}
      </Container>

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
    </>
  )
}

export default User
