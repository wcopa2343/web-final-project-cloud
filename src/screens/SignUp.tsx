/** @jsxRuntime classic */
/** @jsx jsx */

import { FormikHelpers } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { Grid, jsx } from 'theme-ui'

import PageSpinner from '../components/common/PageSpinner'
import LoginLeftPanel from '../components/LoginLeftPanel'
import LoginRightPanel from '../components/LoginRightPanel'
import SignUpForm, { SignupFormValues } from '../components/SignupForm'
import { createUser, selectAuthInfo } from '../redux/authSlice'
import { HttpStatuses, Status, UserAccessInfo } from '../redux/types'

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthInfo)
  const userData = authState.userInfo
  const authRequestStatus = authState.requestStatus
  const history = useHistory()

  const handleSubmit = async (
    { email, password, username }: SignupFormValues,
    { setSubmitting }: FormikHelpers<SignupFormValues>,
  ) => {
    const bodyUserInfo: UserAccessInfo = {
      email: email,
      password: password,
      username: username,
    }
    dispatch(createUser(bodyUserInfo))
    setSubmitting(false)
  }

  let Errortitle: string | undefined
  let duplicatedUsername = false
  let duplicatedEmail = false

  if (authState.loggedIn && userData.userId !== null) {
    const prevLocation: string | null = localStorage.getItem('prevLocation')
    history.push(prevLocation ? prevLocation : '/')
  } else if (
    (authRequestStatus === Status.FAILED || authState.requestError) &&
    authState.requestErrorCode !== HttpStatuses.CONFLICT
  )
    Errortitle = authState.requestError
  else if (authState.requestErrorCode === HttpStatuses.CONFLICT) {
    if (authState.requestError != null) {
      if (authState.requestError.includes('username')) {
        duplicatedUsername = true
      } else if (authState.requestError.includes('email')) {
        duplicatedEmail = true
      }
    }
  }

  return (
    <Grid
      gap={0}
      sx={{
        gridTemplateAreas: ['"form" "switch"', '"switch form"'],
        gridTemplateColumns: ['100%', '40% 60%'],
        gridTemplateRows: ['80% 20%', '100%'],
      }}
    >
      <LoginLeftPanel login={false} requestError={authState.requestError} />
      <LoginRightPanel errorTitle={Errortitle}>
        <SignUpForm
          duplicatedUsername={duplicatedUsername}
          duplicatedEmail={duplicatedEmail}
          handleSubmit={handleSubmit}
        />
      </LoginRightPanel>
      {authRequestStatus === Status.LOADING ? <PageSpinner /> : ''}
    </Grid>
  )
}
export default SignUp
