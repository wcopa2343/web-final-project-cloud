/** @jsxRuntime classic */
/** @jsx jsx */

import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { IoNotificationsSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, Container, Flex, jsx, Link } from 'theme-ui'

import Notification from './Notification'
import { selectAuthInfo } from '../redux/authSlice'
import {
  fetchNotifications,
  getNotifications,
  markAllNotificationsAsRead,
} from '../redux/notificationsSlice'
import { NotificationDBObject } from '../redux/types'

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
  py: '8px',
  textDecoration: 'none',
  '&:hover': {
    color: '#DA3C3D',
  },
}

const hideOptions = {
  display: 'none',
}

const floatingMenuToParent = {
  alignContent: 'stretch',
  backgroundColor: 'lightGray',
  border: '1px solid gray',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  maxHeight: '15vh',
  minWidth: '20vw',
  overflowX: 'auto',
  padding: '0',
  position: 'absolute',
  right: '0',
  top: '100%',
  zIndex: 3,
}

const notificationButtonOptions = {
  alignItems: 'center',
  borderStyle: 'none',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none',
  },
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '100%',
  variant: 'styles.navNav',
}

function useClickOutsideNotifications(
  ref: MutableRefObject<any>,
  fn: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export default function Notifications(): JSX.Element {
  const dispatch = useDispatch()
  const wrapperRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const { isNew, notifications, update } = useSelector(getNotifications)
  const authState = useSelector(selectAuthInfo)
  const token = authState.userInfo.token
  const email = authState.userInfo.email
  const notificationsUnreaded = notifications.filter(
    (notification: NotificationDBObject) => notification.IsNew === true,
  )

  const closeNotifications = (): void => {
    setIsActive(false)
  }
  useClickOutsideNotifications(wrapperRef, closeNotifications)

  useEffect(() => {
    if (update && token) dispatch(fetchNotifications({ token, email }))
  }, [update])

  const markAllAsRead = () => {
    const notificationsToMark: NotificationDBObject[] = []
    notificationsUnreaded.forEach((notification: NotificationDBObject) => {
      const notificationToMark = { ...notification }
      notificationToMark.IsNew = false
      notificationsToMark.push(notificationToMark)
    })
    if (notificationsToMark.length > 0 && token)
      dispatch(
        markAllNotificationsAsRead({
          notifications: notificationsToMark,
          token,
        }),
      )
  }

  return (
    <Flex id="notifications" ref={wrapperRef} sx={{ position: 'relative' }}>
      <button
        onClick={() => setIsActive(!isActive)}
        sx={notificationButtonOptions}
        type="button"
      >
        <IoNotificationsSharp
          sx={{
            fill: '#474044',
            gridArea: '1 / 1 / 2 / 2',
            height: '1.5rem',
            width: '1.5rem',
          }}
        />
        {isNew > 0 ? (
          <Badge
            variant="circle"
            sx={{
              alignSelf: 'end',
              backgroundColor: 'red',
              gridArea: '1 / 1 / 2 / 2',
              justifySelf: 'right',
              transform: 'translate(40%, -20%)',
            }}
          >
            {isNew}
          </Badge>
        ) : null}
      </button>
      <Container sx={isActive ? floatingMenuToParent : hideOptions}>
        {notificationsUnreaded.length > 0 ? (
          <Flex>
            <Link
              onClick={markAllAsRead}
              sx={{
                cursor: 'pointer',
                fontSize: '12px',
                marginTop: '8px',
                ml: 'auto',
                mr: '16px',
              }}
            >
              Mark all as read
            </Link>
          </Flex>
        ) : undefined}
        {notifications.map(
          (notification: NotificationDBObject, index: number) => {
            return (
              <Notification
                obj={notification}
                message={notification.Event.Name}
                read={notification.IsNew}
                sx={floatElement}
                key={'notification' + index}
              />
            )
          },
        )}
        {notifications.length == 0 ? <p>No notifications available</p> : null}
      </Container>
    </Flex>
  )
}
