import React from 'react'
import { Flex, Text } from 'theme-ui'

interface EmptyPageProps {
  children: React.ReactNode
  text: string
}

function EmptyPage({ children, text }: EmptyPageProps): JSX.Element {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'column',
        height: '80%',
        justifyContent: 'center',
        marginTop: '120px',
      }}
    >
      {children}
      <Text sx={{ fontSize: 5, marginTop: '10px' }}>{text}</Text>
    </Flex>
  )
}

export default EmptyPage
