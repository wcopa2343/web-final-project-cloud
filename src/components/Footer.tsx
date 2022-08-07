/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from 'theme-ui'

import ResponsiveContainer from './custom-components/ResponsiveContainer'

function Footer(): JSX.Element {
  return (
    <ResponsiveContainer
      backgroundColor={'lightGray'}
      sx={{
        color: 'gray',
        display: 'flex',
        justifyContent: 'center',
        py: 2,
        height: 120
      }}
    >
      <strong>
      Final Project - Mod 9 Cloud Computing
      <br />
      By: Lisbeth Quisbert & Abel Copa
      <br />
      This page is NOT fully functional, just an example
      </strong>
    </ResponsiveContainer>
  )
}

export default Footer
