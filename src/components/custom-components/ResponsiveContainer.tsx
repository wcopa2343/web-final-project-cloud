/** @jsxRuntime classic */
/** @jsx jsx */

import { Box, Flex, jsx } from 'theme-ui'

const containerStyles = {
  justifyContent: 'center',
  margin: 0,
}

const responsiveStyles = {
  maxWidth: '1640px',
  width: '100%',
  '@media screen and (max-width: 1700px)': {
    maxWidth: '1008px',
  },
  '@media screen and (max-width: 1100px)': {
    maxWidth: '800px',
  },
  '@media screen and (max-width: 840px)': {
    maxWidth: '608px',
  },
  '@media screen and (max-width: 640px)': {
    maxWidth: '440px',
  },
  '@media screen and (max-width: 480px)': {
    maxWidth: '420px',
  },
  '@media screen and (max-width: 440px)': {
    maxWidth: '286px',
  },
}

interface ResponsiveContainerProps {
  backgroundColor?: string
  children: any
}

const ResponsiveContainer = ({
  backgroundColor = 'transparent',
  ...props
}: ResponsiveContainerProps) => (
  <Flex sx={{ ...containerStyles, backgroundColor }}>
    <Box sx={responsiveStyles} {...props} />
  </Flex>
)

export default ResponsiveContainer
