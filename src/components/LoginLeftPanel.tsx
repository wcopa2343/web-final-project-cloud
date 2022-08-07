/** @jsxRuntime classic */
/** @jsx jsx */
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Container, Flex, jsx, Text } from 'theme-ui'

import { clearRequestError } from '../redux/authSlice'

interface messageParams {
  requestError?: string
}

function LoginMessage({ requestError }: messageParams): JSX.Element {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: ['row', 'column'],
        justifyContent: ['space-between', 'center'],
        m: 0,
        p: 0,
        width: '100%',
      }}
    >
      <Text
        variant="title"
        sx={{
          color: 'lightGray',
          display: ['none', 'flex'],
          fontSize: 7,
          fontWeight: 1000,
        }}
      >
        Welcome
      </Text>
      <Text
        variant="title"
        sx={{ color: 'lightGray', fontSize: [3, 6], my: '2rem' }}
      >
        Don&#39;t have an account?
      </Text>
      <Button
        onClick={() => {
          history.push('/sign-up')
          if (requestError) dispatch(clearRequestError())
        }}
        sx={{ fontSize: 3, marginTop: ['0', '0.5rem'] }}
        type="button"
      >
        Sign Up
      </Button>
    </Flex>
  )
}

function SignUpMessage({ requestError }: messageParams): JSX.Element {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: ['row', 'column'],
        justifyContent: ['space-between', 'center'],
        m: 0,
        p: 0,
        width: '100%',
      }}
    >
      <Text
        variant="title"
        sx={{ color: 'lightGray', fontSize: [3, 6], my: '2rem' }}
      >
        Got an account?
      </Text>
      <Button
        onClick={() => {
          history.push('/sign-in')
          if (requestError) dispatch(clearRequestError())
        }}
        sx={{ fontSize: 3, marginTop: '0.5rem' }}
        type="button"
      >
        Sign In
      </Button>
    </Flex>
  )
}

interface LoginLeftPanelProps {
  requestError?: string
  login: boolean
}

const LoginLeftPanel = ({
  requestError,
  login,
}: LoginLeftPanelProps): JSX.Element => {
  const panelMessage = login ? (
    <LoginMessage requestError={requestError} />
  ) : (
    <SignUpMessage requestError={requestError} />
  )
  return (
    <Flex
      sx={{
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 'unset',
        flexDirection: 'column',
        float: 'left',
        gridArea: 'switch',
        justifyContent: 'center',
        margin: '0',
        px: '10%',
        width: '100%',
      }}
    >
      {panelMessage}
    </Flex>
  )
}

export default LoginLeftPanel
