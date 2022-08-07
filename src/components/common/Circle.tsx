import React from 'react'
import { Container } from 'theme-ui'

interface circleProps {
  radius: number
  margin: number
  index: string
}

function Circle(props: circleProps): JSX.Element {
  const radius = `${props.radius}vw`
  const corners = `${props.radius / 2}vw`
  const mx = `-${props.margin}vw`
  const my = `-${props.margin + props.margin / 4}vw`

  return (
    <Container
      sx={{
        marginLeft: mx,
        marginTop: my,
        width: radius,
        height: radius,
        border: 'none',
        borderRadius: corners,
        backgroundColor: 'gray',
        opacity: '5%',
        position: 'absolute',
        zIndex: props.index,
      }}
    />
  )
}

export default Circle
