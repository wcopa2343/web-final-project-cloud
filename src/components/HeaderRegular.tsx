/** @jsxRuntime classic */
/** @jsx jsx */

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Box, jsx } from 'theme-ui'

import { selectAuthInfo } from '../redux/authSlice'
import LoginMenu from './LoginMenu'
import ManageMenu from './ManageMenu'
import Notifications from './Notifications'

const HeaderRegular = (): JSX.Element => {
  const userState = useSelector(selectAuthInfo)
  const userData = userState.userInfo
  const activeColor = {
    color: '#DA3C3D',
  }
  return (
    <div
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          paddingTop: '8px',
        }}
      >
        <NavLink
          activeStyle={activeColor}
          exact
          sx={{ variant: 'styles.navlink' }}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          activeStyle={activeColor}
          exact
          sx={{ variant: 'styles.navlink' }}
          to="/events"
        >
          Events
        </NavLink>
        {userState.loggedIn ? (
        <LoginMenu
          userInfo={userData}
          profilePicture={userData.pictureUrlProfile}
        />
      ) : (
        <NavLink
          activeStyle={activeColor}
          exact
          sx={{ variant: 'styles.navlink' }}
          to="/sign-in"
        >
          Login
        </NavLink>
      )}
        <NavLink
          activeStyle={activeColor}
          exact
          sx={{ variant: 'styles.navlink' }}
          to="/"
        >
          (this page is not fully functional)
        </NavLink>
      </Box>
      <Box
        sx={{
          paddingRight: '15px',
          paddingTop: '8px',
          position: 'relative',
        }}
      >
        {userState.loggedIn && <ManageMenu />}
      </Box>
    </div>
  )
}

export default HeaderRegular
