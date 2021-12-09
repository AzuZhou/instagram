import styled from 'styled-components'

import { COLORS } from 'styles/constants'

export const maxWidth = `
max-width: 975px;
`

export const padding = `padding: 0 20px;`

export const mobileQuery = '@media screen and (min-width: 501px)'

export const ProfilePicture = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  overflow: hidden;
  border-radius: 50%;
  background: ${(props) =>
    props.img
      ? `center / cover no-repeat url(${props.img}), ${COLORS.lightGrey}`
      : COLORS.lightGrey};

  button {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
