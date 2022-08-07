/** @jsxRuntime classic */
/** @jsx jsx */

import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Flex, jsx } from 'theme-ui'

import { logOutUser } from '../redux/authSlice'
import { UserCredentials } from '../redux/types'
interface userMenuProps {
  userInfo: UserCredentials
  closeMenu: () => void
}

export default function LoginMenuResponsive({
  userInfo,
  closeMenu,
}: userMenuProps): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogout = (userData: UserCredentials) => {
    dispatch(logOutUser(userData))
    closeMenu()
    history.push('/sign-in')
  }
  const activeColor = {
    color: '#DA3C3D',
  }
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <NavLink
        activeStyle={activeColor}
        exact
        onClick={closeMenu}
        sx={{ variant: 'styles.navlink' }}
        to="/account"
      >
        Account Settings
      </NavLink>
      <NavLink
        activeStyle={activeColor}
        exact
        onClick={() => handleLogout(userInfo)}
        sx={{ variant: 'styles.navlink' }}
        to="/sign-in"
      >
        Logout
      </NavLink>
    </Flex>
  )
}
