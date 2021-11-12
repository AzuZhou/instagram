import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import Navbar from 'components/Navbar'
import ProfileInfo from 'components/ProfileInfo'

const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`
const Profile = () => {
  const { username } = useParams()

  // TODO: check if user exists by getting user from user collection

  return (
    <Container>
      <Navbar />
      <ProfileInfo profilePicture={''} username={username} />
    </Container>
  )
}

export default Profile
