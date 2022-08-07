import React, { Fragment } from 'react'
import { Text } from 'theme-ui'

interface propsType {
  children: React.ReactNode
  type: string
}

function TextMessage({ children, type, ...props }: propsType): JSX.Element {
  return (
    <Fragment>
      <Text variant={`styles.${type}`} {...props}>
        {children}
      </Text>
    </Fragment>
  )
}

export default TextMessage
