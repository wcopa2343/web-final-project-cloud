/** @jsxRuntime classic */
/** @jsx jsx */

import { FormikHelpers } from 'formik'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { Flex, Grid, jsx } from 'theme-ui'

import PageSpinner from '../components/common/PageSpinner'
import TextSeparator from '../components/common/TextSeparator'
import GoogleBtn from '../components/GoogleBtn'
import LoginForm from '../components/LoginForm'
import LoginLeftPanel from '../components/LoginLeftPanel'
import LoginRightPanel from '../components/LoginRightPanel'
import MicrosoftBtn from '../components/MicrosoftBtn'
import { authUser, forceLogOut, selectAuthInfo } from '../redux/authSlice'
import { HttpStatuses, Status, UserAccessInfo } from '../redux/types'

const SignIn = (): JSX.Element => {
  const dispatch = useDispatch()
  const userState = useSelector(selectAuthInfo)
  const history = useHistory()
  const handleSubmit = async (
    values: UserAccessInfo,
    { setSubmitting }: FormikHelpers<UserAccessInfo>,
  ) => {
    await dispatch(authUser(values))
    setSubmitting(false)
  }

  let Errortitle: string | undefined
  if (userState.requestStatus === Status.LOADING) return <PageSpinner />
  else if (userState.loggedIn) {
    if (userState.requestErrorCode === HttpStatuses.UNAUTHORIZED)
      dispatch(forceLogOut())
    const prevLocation: string | null = localStorage.getItem('prevLocation')
    history.push(prevLocation ? prevLocation : '/')
  } else if (
    userState.requestStatus === Status.FAILED ||
    userState.requestError
  )
    Errortitle = userState.requestError
  return (
    <Grid
      gap={0}
      sx={{
        gridTemplateAreas: ['"form" "switch"', '"switch form"'],
        gridTemplateColumns: ['100%', '40% 60%'],
        gridTemplateRows: ['80% 20%', '100%'],
      }}
    >
      <LoginLeftPanel login={true} requestError={Errortitle} />
      <LoginRightPanel errorTitle={Errortitle}>
        <LoginForm handleSubmit={handleSubmit} />
        <TextSeparator label="or sign in with" />
        <Flex sx={{ justifyContent: ['space-between', 'center'], gap: '1rem' }}>
          <GoogleBtn />
          <MicrosoftBtn />
        </Flex>
      </LoginRightPanel>
    </Grid>
  )
}
export default SignIn
