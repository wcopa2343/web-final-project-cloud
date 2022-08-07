import React from 'react'
import { Flex, Spinner } from 'theme-ui'

function PageSpinner(): JSX.Element {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        height: '85%',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        zIndex: 9,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Spinner sx={{ color: 'orange' }} />
    </Flex>
  )
}

export default PageSpinner
