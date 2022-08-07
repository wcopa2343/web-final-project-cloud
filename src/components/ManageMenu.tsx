/** @jsxRuntime classic */
/** @jsx jsx */

import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, jsx, Link } from 'theme-ui'

const floatElement = {
  border: '1px solid gray',
  borderStyle: 'none none solid',
  backgroundColor: 'lightGray',
  color: 'gray',
  cursor: 'pointer',
  display: 'block',
  fontSize: 2,
  fontWeight: 'bold',
  marginTop: '0',
  mx: '4px',
  px: '16px',
  py: '8px',
  textDecoration: 'none',
  '&:hover': {
    color: '#DA3C3D',
  },
}

const floatMenuOptions = {
  display: 'none',
}

const floatMenuOptionsActive = {
  alignContent: 'stretch',
  backgroundColor: 'lightGray',
  border: '1px solid gray',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
  marginTop: '15px',
  minWidth: '130px',
  position: 'absolute',
  right: '0',
  width: 'auto',
  zIndex: 3,
}

export default function ManageMenu(): JSX.Element {
  const [isActive, setIsActive] = useState(false)

  const closeMenu = () => {
    setIsActive(false)
  }

  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', closeMenu)
      return () => {
        document.removeEventListener('click', closeMenu)
      }
    }
  }, [isActive])

  return (
    <Container variant="noMargin">
      <Link
        onClick={() => setIsActive(!isActive)}
        sx={{ variant: 'styles.navlink', cursor: 'pointer' }}
      >
        Manage
      </Link>
      <Container sx={isActive ? floatMenuOptionsActive : floatMenuOptions}>
        <NavLink
          activeStyle={{ color: '#DA3C3D' }}
          exact
          sx={floatElement}
          to="/events/eventsManager"
        >
          Events
        </NavLink>
        <NavLink
          activeStyle={{ color: '#DA3C3D' }}
          exact
          sx={floatElement}
          to="/conferences/conferenceManager"
        >
          Conferences
        </NavLink>
      </Container>
    </Container>
  )
}
