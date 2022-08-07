import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'theme-ui'

import AccountInformation from '../components/AccountInformation'
import PageSpinner from '../components/common/PageSpinner'
import PasswordUpdate from '../components/PasswordUpdate'
import { selectAuthInfo } from '../redux/authSlice'
import { fetchById, singleUserInfo } from '../redux/userSlice'

const Account = (): JSX.Element => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthInfo)
  const { email, userId, username } = authState.userInfo
  const { userinformation, status } = useSelector(singleUserInfo)

  useEffect(() => {
    dispatch(fetchById(userId))
  }, [dispatch, userId])

  if (status === 'idle') {
    return <Container />
  }
  if (status === 'loading') {
    return <PageSpinner />
  }
  if (status === 'failure') {
    return <Container />
  }
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        '@media screen and (max-width:768px)': {
          flexDirection: 'column',
          margin: '0px -10px',
        },
      }}
    >
      <AccountInformation
        facebookUrlProfile={userinformation.facebookUrlProfile}
        firstName={userinformation.firstName}
        lastName={userinformation.lastName}
        linkedinUrlProfile={userinformation.linkedinUrlProfile}
        pictureUrlProfile={userinformation.pictureUrlProfile}
        twitterUrlProfile={userinformation.twitterUrlProfile}
        userId={userinformation.userId}
        youtubeUrlProfile={userinformation.youtubeUrlProfile}
      />
      <PasswordUpdate email={email} username={username} />
    </Container>
  )
}

export default Account
