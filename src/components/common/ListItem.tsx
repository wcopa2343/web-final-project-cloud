import React from 'react'
import { Container } from 'theme-ui'

interface ListProps {
  background: string
  children?: React.ReactNode
  color: string
  size: number
}

function ListItem(props: ListProps): JSX.Element {
  return (
    <Container
      {...props}
      sx={{
        alignItems: 'center',
        backgroundColor: props.color,
        borderRadius: `${props.size / 2}px`,
        display: 'flex',
        height: `${props.size}px`,
        justifyContent: 'center',
        width: `${props.size}px`,
      }}
      variant="noMargin"
    >
      <Container
        sx={{
          backgroundColor: props.background,
          borderRadius: `${(props.size / 1.7) * 2}px`,
          height: `${props.size / 1.7}px`,
          width: `${props.size / 1.7}px`,
        }}
        variant="noMargin"
      ></Container>
    </Container>
  )
}

export default ListItem
