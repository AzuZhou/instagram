import styled from 'styled-components'

import Modal from 'components/shared/Modal'

import { useModal } from 'utils/hooks'

const Container = styled.div``
const ProfilePicture = styled.div``
const Info = styled.div``
const Username = styled.h3``
const Actions = styled.div``

const ProfileInfo = ({ profilePicture, username }) => {
  const [isOpen, handleModal] = useModal()

  return (
    <>
      <Container>
        <ProfilePicture>
          <button onClick={() => handleModal()}>
            <img src={profilePicture} alt={username} />
          </button>
        </ProfilePicture>

        <Info>
          <Username>{username}</Username>
          <Actions>
            <button>Edit Profile</button>
          </Actions>
        </Info>
      </Container>

      {isOpen && (
        <Modal>
          <h1>Change Profile Picture</h1>
          <button>Upload Photo</button>
          <button>Remove Current Photo</button>
          <button onClick={() => handleModal()}>Cancel</button>
        </Modal>
      )}
    </>
  )
}

export default ProfileInfo
