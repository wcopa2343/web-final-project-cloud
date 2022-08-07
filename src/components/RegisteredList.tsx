import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { Flex, Image, Text } from 'theme-ui'

import { registrationsByEvent } from '../redux/registrationsSlice'
import CircleCounter from './common/CircleCounter'

function RegisteredList(): JSX.Element {
  const { registrationList } = useSelector(registrationsByEvent)

  let space = 0
  let counter = 0
  let innerCounter = 0

  const list = registrationList.map(user => {
    if (counter < 8) {
      counter++
      space += 30
      return (
        <div key={user.id}>
          <div data-tip={user.name}>
            <Image
              src={user.picture}
              sx={{
                borderRadius: '150px',
                height: '50px',
                left: `${space}px`,
                position: 'absolute',
                width: '50px',
              }}
            />
          </div>
          <ReactTooltip
            backgroundColor="rgba(71, 64, 68, 0.8)"
            place="bottom"
            textColor="white"
          />
        </div>
      )
    } else {
      innerCounter++
      return <div key={user.id}></div>
    }
  })

  return (
    <div></div>
  )
}

export default RegisteredList
