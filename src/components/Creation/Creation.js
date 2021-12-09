import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { getDays, getHours } from 'utils/helpers'

import { COLORS } from 'styles/constants'

const Container = styled.p`
  padding: 0 16px;
  margin-bottom: 16px;

  color: ${COLORS.textGrey};
  letter-spacing: 0.2px;
  font-size: 10px;
  line-height: 18px;
  text-transform: uppercase;
`

const Creation = ({ timestamp }) => {
  const [creation, setCreation] = useState('')

  useEffect(() => {
    const todayInSeconds = Date.now()
    const nowInSeconds = todayInSeconds / 1000
    const secondsOfDifference = nowInSeconds - timestamp.seconds
    const days = getDays(secondsOfDifference)

    if (secondsOfDifference > 86400) {
      if (days === 1) {
        setCreation(`${days} DAY AGO`)
      } else if (days > 7) {
        const todayInMiliSeconds = new Date(todayInSeconds)
        const timestampInMiliSeconds = new Date(timestamp.seconds * 1000)
        const timestampYear = timestampInMiliSeconds.getUTCFullYear()
        const isCurrentYear = todayInMiliSeconds.getUTCFullYear() === timestampYear
        const date = timestampInMiliSeconds.toLocaleString('default', {
          month: 'long',
          day: 'numeric',
        })

        const creation = `${date}${isCurrentYear ? '' : `, ${timestampYear}`}`

        setCreation(creation)
      } else {
        setCreation(`${days} DAYS AGO`)
      }
    } else {
      const hours = getHours(secondsOfDifference - days * 86400)
      if (hours === 1) {
        setCreation(`${hours} HOUR AGO`)
      } else {
        setCreation(`${hours} HOURS AGO`)
      }
    }
  }, [timestamp])

  return <Container>{creation}</Container>
}

export default Creation
