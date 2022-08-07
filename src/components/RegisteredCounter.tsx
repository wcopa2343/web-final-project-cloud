/** @jsxRuntime classic */
/** @jsx jsx */

import { IoPeopleSharp } from 'react-icons/io5'
import { Flex, jsx, Text } from 'theme-ui'

interface RegisteredCounterProps {
  capacity: number
  count: number
}

function RegisteredCounter({
  capacity,
  count,
}: RegisteredCounterProps): JSX.Element {
  return (
    <Flex sx={{ alignItems: 'center', my: '0.5rem', width: '100%' }}>
      <IoPeopleSharp sx={{ height: '2rem', width: '2rem' }} />
      <Flex sx={{ margin: '0.5rem 1rem' }}>
        {count}
        <Text sx={{ fontSize: '12px', marginTop: '8px' }}>/{capacity}</Text>
      </Flex>
    </Flex>
  )
}

export default RegisteredCounter
