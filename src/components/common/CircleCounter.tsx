import React from 'react'
import { Container, Text } from 'theme-ui'

interface Props {
  counter: number
  spacing: number
}
function CircleCounter({ counter, spacing }: Props): JSX.Element {
  return (
    <Container
      sx={{
        alignItems: 'center',
        backgroundColor: 'lightGray',
        borderRadius: '150px',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        height: '50px',
        justifyContent: 'center',
        left: `${spacing}px`,
        position: 'absolute',
        width: '50px',
      }}
      variant="noMargin"
    >
      <Text
        variant="title_3"
        sx={{ color: 'gray', fontWeight: '600' }}
      >{`${counter}+`}</Text>
    </Container>
  )
}

export default CircleCounter
