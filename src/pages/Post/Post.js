import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import Navbar from 'components/Navbar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MediaStep = styled.section``
const CaptionStep = styled.section``
const MediaPreview = styled.div`
  > img {
    max-width: 600px;
  }
`

const Submit = styled.button``

const Post = () => {
  const [isMediaPreviewed, setIsMediaPreviewed] = useState(false)
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')

  const handleFileChange = (e) => setFile(e.target.files[0])
  const handleCaptionChange = ({ target: { value } }) => setCaption(value)

  useEffect(() => file && setIsMediaPreviewed(true), [file])

  return (
    <Container>
      <Navbar />

      <MediaStep>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />

        {file && (
          <MediaPreview>
            <img src={URL.createObjectURL(file)} alt={file.name} />
          </MediaPreview>
        )}
      </MediaStep>

      <CaptionStep style={{ opacity: isMediaPreviewed ? '1' : '0' }}>
        <textarea
          rows="10"
          cols="60"
          placeholder="Add a caption..."
          wrap="hard"
          onChange={handleCaptionChange}
        />

        <Submit>Submit</Submit>
      </CaptionStep>
    </Container>
  )
}

export default Post
