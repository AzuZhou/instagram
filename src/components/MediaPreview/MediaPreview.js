import styled from 'styled-components'

const Container = styled.div`
  > img {
    max-width: 600px;
  }
`

const MediaPreview = ({ fileUrl, fileName }) => (
  <Container>
    <img src={fileUrl} alt={fileName} />
  </Container>
)

export default MediaPreview
