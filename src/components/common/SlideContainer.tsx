import React from 'react'
import { Container, Text } from 'theme-ui'

interface SlideContainerProps {
  image: string
  imageName: string
  slideTitle: string
  summary: string
}

export const SlideContainer = ({
  image,
  imageName,
  slideTitle,
  summary,
}: SlideContainerProps): JSX.Element => {
  return (
    <Container
      sx={{
        border: '5px',
        borderColor: 'orange',
        borderRadius: '15px',
        position: 'relative',
        width: '100%',
      }}
      variant="noMargin"
    >
      <img alt={imageName} src={image} sx={{ display: 'block' }} />
      <Text
        sx={{
          position: 'absolute',
          textAlign: 'center',
          top: 250,
          width: '100%',
        }}
        variant="title_4"
      >
        {slideTitle}
      </Text>
      <Text
        sx={{
          position: 'absolute',
          textAlign: 'center',
          top: 325,
          width: '100%',
        }}
        variant="summary"
      >
        {summary}
      </Text>
    </Container>
  )
}
