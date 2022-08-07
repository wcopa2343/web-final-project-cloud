/** @jsxRuntime classic */
/** @jsx jsx */

import { IoEllipse } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { Flex, jsx } from 'theme-ui'

import { selectAuthInfo } from '../redux/authSlice'
import { markViewedNotification } from '../redux/notificationsSlice'
import { NotificationProps } from '../redux/types'

export default function Notification({
  obj,
  message,
  read,
}: NotificationProps): JSX.Element {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthInfo)
  const token = authState.userInfo.token
  const body = { ...obj }

  function markAsViewed() {
    if (body.IsNew && token) {
      body.IsNew = false
      dispatch(markViewedNotification({ body, token }))
    }
  }
  return (
    <Flex
      onClick={markAsViewed}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        ':hover': { backgroundColor: 'grey' },
      }}
    >
      <p sx={{ margin: '0' }}>{message}</p>
      {read ? (
        <IoEllipse
          sx={{
            fill: '#474044',
            height: '1rem',
            width: '1rem',
          }}
        />
      ) : null}
    </Flex>
  )
}
