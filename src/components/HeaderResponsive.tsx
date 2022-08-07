/** @jsxRuntime classic */
/** @jsx jsx */

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Container, Image, jsx, MenuButton } from 'theme-ui'

import { selectAuthInfo } from '../redux/authSlice'
import LoginMenuResponsive from './LoginMenuResponsive'

const HeaderResponsive = (): JSX.Element => {
  const userState = useSelector(selectAuthInfo)
  const userData = userState.userInfo
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const isLogged = userState.loggedIn ? {} : { maxHeight: '24vh' }
  const isDisplayed = click
    ? { maxHeight: '40vh', minHeight: '15vh' }
    : { height: '0' }
  interface smProps {
    children: React.ReactNode
    className?: string
  }

  const SmContainer = (props: smProps): JSX.Element => {
    return (
      <Container
        variant={'noMargin'}
        sx={{
          backgroundColor: 'lightGray',
          borderBottomLeftRadius: '15px',
          bottom: '0',
          boxShadow: '-10px 10px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          ...isDisplayed,
          ...isLogged,
          justifyContent: 'flex-start',
          marginTop: '82px',
          overflowX: 'hidden',
          position: 'absolute',
          right: '0',
          top: '0',
          transition: '0.5s',
          width: '200px',
          zIndex: '1',
        }}
      >
        {props.children}
      </Container>
    )
  }

  const activeColor = {
    color: '#DA3C3D',
  }

  return (
    <div>
      <Container
        sx={{
          alignItems: 'center',
          display: 'none',
          justifyContent: 'space-between',
          '@media screen and (max-width:1200px)': {
            display: 'flex',
            fontSize: '12px',
          },
        }}
      >
        {userState.loggedIn && (
          <Image
            src={userData.pictureUrlProfile}
            sx={{
              borderRadius: '20px',
              height: '30px',
              width: '30px',
            }}
          />
        )}

        <MenuButton
          onClick={() => handleClick()}
          sx={{
            ariaLabel: 'Toggle Menu',
            display: 'none',
            '@media screen and (max-width:1200px)': {
              display: 'flex',
            },
          }}
        />
      </Container>
      <SmContainer>
        <NavLink
          activeStyle={activeColor}
          exact
          onClick={() => handleClick()}
          sx={{ variant: 'styles.navlink' }}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          activeStyle={activeColor}
          exact
          onClick={() => handleClick()}
          sx={{ variant: 'styles.navlink' }}
          to="/events"
        >
          Events
        </NavLink>
        <NavLink
          activeStyle={activeColor}
          exact
          onClick={() => handleClick()}
          sx={{ variant: 'styles.navlink' }}
          to="/conferences"
        >
          Conferences
        </NavLink>
        {userState.loggedIn && (
          <NavLink
            activeStyle={activeColor}
            exact
            onClick={() => handleClick()}
            sx={{ variant: 'styles.navlink' }}
            to="/events/eventsManager"
          >
            Manage Events
          </NavLink>
        )}
        {userState.loggedIn && (
          <NavLink
            activeStyle={activeColor}
            exact
            sx={{ variant: 'styles.navlink' }}
            to="/conferences/conferenceManager"
          >
            Manage Conferences
          </NavLink>
        )}
        {/* <Link sx={{ ...sideA }} to="/" onClick={() => handleClick()}>
          About
        </Link>
        <Link sx={{ ...sideA }} to="/" onClick={() => handleClick()}>
          Contact
        </Link> */}
        {userState.loggedIn ? (
          <LoginMenuResponsive
            userInfo={userData}
            closeMenu={() => setClick(!click)}
          />
        ) : (
          <NavLink
            activeStyle={activeColor}
            exact
            onClick={() => handleClick()}
            sx={{ variant: 'styles.navlink' }}
            to="/sign-in"
          >
            Login
          </NavLink>
        )}
      </SmContainer>
    </div>
  )
}

export default HeaderResponsive
