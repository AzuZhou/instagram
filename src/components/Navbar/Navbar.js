import { useEffect } from 'react'

import User from 'components/User'

import logo from 'images/logo.png'
import { ReactComponent as Add } from 'icons/add.svg'

import { auth } from 'firebaseConfig'
import { useProfilePicture } from 'utils/hooks'

import { ProfilePicture } from 'styles/styles'

import { Container, Logo, NavbarSpace, Actions, AddPost } from './styled'

const Navbar = () => {
  const [profilePicture, getProfilePicture] = useProfilePicture(auth.currentUser.displayName)

  useEffect(() => {
    getProfilePicture()
  }, [])

  return (
    <>
      <Container>
        <nav>
          <Logo to="/">
            <img src={logo} alt="Instagram" />
          </Logo>

          <Actions>
            <AddPost to="/post">
              <Add />
            </AddPost>

            <User>
              <ProfilePicture size="22px" img={profilePicture} />
            </User>
          </Actions>
        </nav>
      </Container>
      <NavbarSpace />
    </>
  )
}

export default Navbar
