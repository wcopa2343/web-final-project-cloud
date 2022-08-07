/** @jsxRuntime classic */
/** @jsx jsx */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image, jsx } from 'theme-ui'

import light from '../assets/logo/light.svg'
import ResponsiveContainer from './custom-components/ResponsiveContainer'
import HeaderRegular from './HeaderRegular'
import HeaderResponsive from './HeaderResponsive'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 1040,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

const Header = (): JSX.Element => {
  const isMobile = useWindowSize().width < 1200

  return (
    <ResponsiveContainer
      backgroundColor={'lightGray'}
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Link to="/">
          <Image
            alt="Logo"
            src={light}
            sx={{
              margin: '6px 1px 0 1px',
              width: '90px',
            }}
          />
        </Link>
      </div>
      {isMobile ? <HeaderResponsive /> : <HeaderRegular />}
    </ResponsiveContainer>
  )
}

export default Header
