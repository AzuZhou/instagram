import { useState, useCallback, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'

import { db } from 'firebaseConfig'

const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return { id, open, anchorEl, handlePopoverClick, handlePopoverClose }
}

const useProfilePicture = (username) => {
  const [profilePicture, setProfilePicture] = useState(null)

  const getProfilePicture = async () => {
    const userRef = doc(db, 'users', username)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      setProfilePicture(docSnap.data().profilePicture)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  return [profilePicture, getProfilePicture]
}

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)
  const handleModal = useCallback(() => setIsOpen((isOpen) => !isOpen), [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return [isOpen, handleModal]
}

export { useModal, useProfilePicture, usePopover }
