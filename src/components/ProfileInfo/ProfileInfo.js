import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'

import Modal from 'components/shared/Modal'

import { storage, auth, db } from 'firebaseConfig'
import { useModal } from 'utils/hooks'

import { ProfilePicture } from 'styles/styles'

import { Container, Info, Username, Actions, UploadButton } from './styled'

// TODO: handle loaders

const ProfileInfo = ({ profilePicture, profilePictureName, username }) => {
  const [isOpen, handleModal] = useModal()
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = ({ target: { files } }) => {
    const file = files[0]
    handlePhotoUpload(file)
  }

  const handlePhotoUpload = (file) => {
    setIsLoading(true)
    const mediaRef = ref(storage, `users/${auth.currentUser.uid}/${file.name}`)
    const uploadTask = uploadBytesResumable(mediaRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // setProgress(progress)
      },
      (error) => {
        console.log('error: ', error)
        setIsLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const userRef = doc(db, 'users', username)
          updateDoc(userRef, {
            profilePicture: downloadURL,
            profilePictureName: file.name,
          })
        })

        handleModal()
        setIsLoading(false)
      }
    )
  }

  const handlePhotoRemoval = () => {
    if (profilePicture && profilePictureName) {
      const mediaRef = ref(storage, `users/${auth.currentUser.uid}/${profilePictureName}`)

      deleteObject(mediaRef)
        .then(() => {
          const userRef = doc(db, 'users', username)
          updateDoc(userRef, {
            profilePicture: '',
            profilePictureName: '',
          })
        })
        .catch((error) => {
          console.log('error: ', error)
        })
        .finally(() => {
          handleModal()
        })
    }
  }

  const isOwnProfile = username === auth.currentUser.displayName
  // TODO: change ProfilePicture's srtructure
  return (
    <>
      <Container>
        <ProfilePicture size="100px">
          {isOwnProfile && (
            <button onClick={() => handleModal()}>
              {profilePicture ? <img src={profilePicture} alt={username} /> : null}
            </button>
          )}
          {!isOwnProfile && profilePicture ? <img src={profilePicture} alt={username} /> : null}
        </ProfilePicture>

        <Info>
          <Username>{username}</Username>
          <Actions>
            {isOwnProfile ? <button>Edit Profile</button> : <button>Follow</button>}
          </Actions>
        </Info>
      </Container>

      {isOwnProfile && isOpen && (
        <Modal>
          <h1>Change Profile Picture</h1>
          <UploadButton>
            <input
              type="file"
              id="profile-picture"
              name="profile-picture"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            <button>Upload Photo</button>
          </UploadButton>
          <button onClick={handlePhotoRemoval}>Remove Current Photo</button>
          <button onClick={() => handleModal()}>Cancel</button>
        </Modal>
      )}
    </>
  )
}

export default ProfileInfo
