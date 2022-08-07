/** @jsxRuntime classic */
/** @jsx  jsx */

import { Flex, jsx, ThemeUICSSObject } from 'theme-ui'

interface ComponentProps {
  label: string
}

const pseudoElementStyles: ThemeUICSSObject = {
  backgroundColor: '#474044',
  content: '""',
  display: 'block',
  height: 1,
  position: 'absolute',
  top: '50%',
  width: '100%',
}

const styles: ThemeUICSSObject = {
  position: 'relative',
  '::after': {
    ...pseudoElementStyles,
    left: '110%',
  },
  '::before': {
    ...pseudoElementStyles,
    right: '110%',
  },
}

const TextSeparator = ({ label }: ComponentProps): JSX.Element => {
  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <p sx={styles}>{label}</p>
    </Flex>
  )
}

export default TextSeparator
