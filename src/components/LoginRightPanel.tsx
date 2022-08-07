/** @jsxRuntime classic */
/** @jsx jsx */
import { Container, Flex, jsx } from 'theme-ui'

import TextMessage from './common/TextMessage'

interface LoginRightPanelProps {
  children: React.ReactNode
  errorTitle?: string
}

const LoginRightPanel = ({
  children,
  errorTitle,
}: LoginRightPanelProps): JSX.Element => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        fontSize: 4,
        height: ['auto', '85vh'],
        gridArea: 'form',
        justifyContent: 'center',
        margin: 0,
        px: '10%',
        width: '100%',
      }}
    >
      <Container sx={{ marginX: 0, paddingX: 0 }}>
        <TextMessage type="error">{errorTitle}</TextMessage>
        {children}
      </Container>
    </Flex>
  )
}

export default LoginRightPanel
