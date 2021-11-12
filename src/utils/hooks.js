import { useState, useCallback, useEffect } from 'react'

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)
  const handleModal = useCallback(() => setIsOpen((isOpen) => !isOpen), [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return [isOpen, handleModal]
}

export { useModal }
