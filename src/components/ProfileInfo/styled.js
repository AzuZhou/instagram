import styled from 'styled-components'

const Container = styled.section`
  width: 500px;
  display: flex;
  gap: 20px;
`

const Info = styled.div`
  display: flex;
  gap: 10px;
`
const Username = styled.h3``
const Actions = styled.div``
const UploadButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    pointer-events: none;
  }

  input {
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    opacity: 0;
    cursor: pointer;
  }
`

export { Container, Info, Username, Actions, UploadButton }
