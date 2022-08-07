/** @jsxRuntime classic */
/** @jsx jsx */

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Box, Container, Image, jsx } from 'theme-ui'

import { logOutUser } from '../redux/authSlice'
import { UserCredentials } from '../redux/types'

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
  minWidth: '170px',
  position: 'absolute',
  right: '0',
  width: 'auto',
  zIndex: 3,
}

const usernameButtonOptions = {
  backgroundColor: 'lightGray',
  borderStyle: 'none',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none',
  },
  variant: 'styles.navNav',
}

interface userMenuProps {
  profilePicture: string
  userInfo: UserCredentials
}

export default function LoginMenu({
  profilePicture,
  userInfo,
}: userMenuProps): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
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

  const handleLogout = (userData: UserCredentials) => {
    dispatch(logOutUser(userData))
    history.push('/sign-in')
  }

  return (
    <Box
      sx={{ position: 'relative', variant: 'layout.noMargin', width: 'auto' }}
    >
      <button
        onClick={() => setIsActive(!isActive)}
        sx={usernameButtonOptions}
        type="button"
      >
        <Image
          src={profilePicture}
          sx={{ borderRadius: '20px', height: '40px', width: '40px' }}
        />
      </button>
      <Container sx={isActive ? floatMenuOptionsActive : floatMenuOptions}>
        <div sx={{ ...floatElement, textAlign: 'center', fontSize: '15px' }}>
          {userInfo.username}
        </div>
        <NavLink
          activeStyle={{ color: '#DA3C3D' }}
          exact
          sx={floatElement}
          to="/account"
        >
          Account Settings
        </NavLink>
        <button
          onClick={() => handleLogout(userInfo)}
          sx={{
            borderBottomStyle: 'none',
            ...floatElement,
          }}
        >
          Logout
        </button>
      </Container>
    </Box>
  )
}
