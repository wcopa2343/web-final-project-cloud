/** @jsxRuntime classic */
/** @jsx jsx */

import { IoLogoWindows } from 'react-icons/io5'
import MicrosoftLogin from 'react-microsoft-login'
import { useDispatch } from 'react-redux'
import { Button, jsx } from 'theme-ui'

import { oauthRequestError, oauthUser } from '../redux/authSlice'

function MicrosoftBtn(): JSX.Element {
  const dispatch = useDispatch()
  const clientId = process.env.REACT_APP_MICROSOFT_CLIENT || ''

  function handleLogin(error: any, response: any) {
    if (error) {
      oauthRequestError()
    } else {
      const body = {
        applicationId: 2,
        jwToken: response.idToken.rawIdToken,
      }
      dispatch(oauthUser(body))
    }
  }
  return (
    <MicrosoftLogin
      authCallback={handleLogin}
      clientId={clientId}
      prompt="select_account"
    >
      <Button
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
        }}
        variant="green"
      >
        <IoLogoWindows
          sx={{
            fill: 'white',
            gridArea: '1 / 1 / 2 / 2',
            height: '1.5rem',
            width: '1.5rem',
          }}
        />
        Microsoft
      </Button>
    </MicrosoftLogin>
  )
}

export default MicrosoftBtn
