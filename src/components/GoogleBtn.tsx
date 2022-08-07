/** @jsxRuntime classic */
/** @jsx jsx */

import { GoogleLogin } from 'react-google-login'
import { IoLogoGoogle } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { Button, jsx } from 'theme-ui'

import { oauthUser, oauthRequestError } from '../redux/authSlice'

function GoogleBtn(): JSX.Element {
  const dispatch = useDispatch()
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT || ''

  function handleLoginFailure(response: any) {
    oauthRequestError()
  }

  function handleLoginSuccess(response: any) {
    const body = {
      applicationId: 1,
      jwToken: response.tokenId,
    }
    dispatch(oauthUser(body))
  }

  return (
    <GoogleLogin
      buttonText="Login"
      clientId={clientId}
      cookiePolicy={'single_host_origin'}
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      render={renderProps => (
        <Button
          disabled={renderProps.disabled}
          onClick={renderProps.onClick}
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-around',
          }}
          variant="green"
        >
          <IoLogoGoogle
            sx={{
              fill: 'white',
              gridArea: '1 / 1 / 2 / 2',
              height: '1.5rem',
              width: '1.5rem',
            }}
          />
          Google
        </Button>
      )}
      responseType="code,token"
    />
  )
}

export default GoogleBtn
