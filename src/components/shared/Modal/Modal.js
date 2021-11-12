import styled from 'styled-components'

import { COLORS } from 'styles/constants'

const Container = styled.div`
  position: fixed;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`
const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: ${COLORS.overlayBlack};
`
const Box = styled.div`
  position: relative;
  z-index: 3;
  min-width: 400px;
  min-height: 200px;
  margin: 20px;
  display: flex;
  flex-direction: column;

  background-color: ${COLORS.backgroundWhite};
  border-radius: 12px;
`

const Modal = ({ children }) => (
  <Container>
    <Overlay />
    <Box>{children}</Box>
  </Container>
)

export default Modal
