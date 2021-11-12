import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'

import Modal from 'components/shared/Modal'

import { storage, auth, db } from 'firebaseConfig'
import { useModal } from 'utils/hooks'

import { Container, ProfilePicture, Info, Username, Actions, UploadButton, Circle } from './styled'

// TODO: handle loaders
// TODO: figure out whether profile pic and disnplayName go in auth or store

const ProfileInfo = ({ profilePicture, username }) => {
  const [isOpen, handleModal] = useModal()
  const [file, setFile] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = ({ target: { files } }) => {
    const file = files[0]
    setFile(file)

    handlePhotoUpload()
  }

  const handlePhotoUpload = () => {
    setIsLoading(true)
    const mediaRef = ref(storage, `users/${auth.currentUser.uid}/${file.name}`)
    const uploadTask = uploadBytesResumable(mediaRef, file)

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log('error: ', error)
        setIsLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const userRef = doc(db, 'users', username)
          updateDoc(userRef, {
            profilePicture: downloadURL,
          })

          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
        })

        handleModal()
        setIsLoading(false)
      }
    )
  }

  const handlePhotoRemoval = () => {
    if (profilePicture) {
      const mediaRef = ref(storage, `users/${auth.currentUser.uid}/${file.name}`)

      deleteObject(mediaRef)
        .then(() => {
          const userRef = doc(db, 'users', username)
          updateDoc(userRef, {
            profilePicture: '',
          })

          updateProfile(auth.currentUser, {
            photoURL: '',
          })
        })
        .catch((error) => {
          console.log('error: ', error)
        })
    }
  }

  const isOwnProfile = username === auth.currentUser.displayName

  return (
    <>
      <Container>
        <ProfilePicture>
          {isOwnProfile && profilePicture && (
            <button onClick={() => handleModal()}>
              <Circle>
                <img src={profilePicture} alt={username} />
              </Circle>
            </button>
          )}
          {!isOwnProfile && profilePicture && (
            <Circle>
              <img src={profilePicture} alt={username} />
            </Circle>
          )}
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
