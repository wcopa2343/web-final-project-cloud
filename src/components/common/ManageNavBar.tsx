import { keyframes } from '@emotion/css'
import React, { Fragment, useState } from 'react'
import { Box, Container, Flex, Link } from 'theme-ui'

import arrowCircle from '../../assets/arrowCircle.svg'

interface Props {
  conferenceId?: string
  children?: React.ReactNode
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

function ManageNavBar({ conferenceId, ...props }: Props): JSX.Element {
  const [toggle, setToggle] = useState(false)
  const [hide, setHidden] = useState(true)

  return (
    <Fragment>
      <Box {...props}>
        <Container
          data-testid="toggleNavBar"
          sx={{
            alignItems: 'center',
            backgroundColor: 'orange',
            borderBottomLeftRadius: '40px',
            display: 'flex',
            height: '70px',
            mr: 0,
            transitionDuration: '0.5s',
            transitionProperty: 'width',
            width: `${toggle ? '30vw' : '100px'}`,
            zIndex: '999',
          }}
          onClick={async () => {
            if (!hide) {
              setToggle(true)
              await setTimeout(() => {
                setHidden(true)
              }, 500)
            } else {
              setToggle(false)
              setHidden(false)
            }
          }}
          variant="NoMargin"
        >
          <Container
            sx={{
              alignItems: 'center',
              content: `url(${arrowCircle})`,
              justifyContent: 'center',
              ml: '20px',
              transform: `${toggle ? 'rotate(180deg)' : 'rotate(360deg)'}`,
              transitionDuration: '1s',
              transitionProperty: 'transform',
              width: '50px',
            }}
            variant="noMargin"
          />
          {hide ? (
            <Flex
              sx={{
                alignItems: 'center',
                animation: `${fadeIn} 0.5s ease`,
                justifyItems: 'center',
                transitionDuration: '0.5s',
                transitionProperty: 'width',
                width: `${toggle ? '25vw' : 0}`,
              }}
            >
              <Link
                sx={{ variant: 'styles.manageLink' }}
                href={`/conferences/control/${conferenceId}`}
              >
                Home
              </Link>
              <Link
                sx={{ variant: 'styles.manageLink' }}
                href={`/conferences/addEvents/${conferenceId}`}
              >
                Add event
              </Link>
              <Link
                sx={{ variant: 'styles.manageLink' }}
                href={`/conferences/ConferenceEventsManager/${conferenceId}`}
              >
                Manage events
              </Link>
              <Link
                sx={{ variant: 'styles.manageLink' }}
                href={`/conferences/calendar/${conferenceId}`}
              >
                Calendar
              </Link>
            </Flex>
          ) : (
            <div></div>
          )}
        </Container>
      </Box>
    </Fragment>
  )
}

export default ManageNavBar
