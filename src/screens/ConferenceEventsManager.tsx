import React, { useEffect } from 'react'
import { FaRegCalendarPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'
import { Box, Button, Container, Flex, Text } from 'theme-ui'

import EmptyPage from '../components/common/EmptyPage'
import PageSpinner from '../components/common/PageSpinner'
import ManageEventsConference from '../components/ManageEventsConference'
import { selectAuthInfo } from '../redux/authSlice'
import { fetchEvents, selectAllEvents } from '../redux/eventsSlice'
import {
  singleConference,
  fetchConferencesById,
} from '../redux/conferenceSlice'
import { Filter, Status } from '../redux/types'

function ConferenceEventsManager({
  match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
  const dispatch = useDispatch()
  const currentState = useSelector(selectAllEvents)
  const currentUser = useSelector(selectAuthInfo)
  const currentConference = useSelector(singleConference)
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchConferencesById(match.params.id))
    const newFilter: Filter = {
      createdBy: currentUser.userInfo.userId,
      conferenceId: match.params.id,
    }
    dispatch(fetchEvents(newFilter))
  }, [dispatch, currentUser, match.params.id])

  if (currentState.status === Status.IDLE) {
    return <Box />
  } else if (currentState.status === Status.LOADING) {
    return <PageSpinner />
  } else if (currentState.status === Status.FAILED) {
    return <Box> Failure Fetching Data</Box>
  } else {
    return (
      <Container variant="noMargin" sx={{ height: '-webkit-fill-available' }}>
        <Flex
          sx={{
            alignContent: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            mx: 'auto',
            width: '90vw',
          }}
        >
          <Text variant="title_4">
            Manage {currentConference.conference.conferenceName} Events
          </Text>
        </Flex>
        {!currentState.events.value.length ? (
          <EmptyPage text="No events yet">
            <FaRegCalendarPlus size="5em" color="#474044" />
          </EmptyPage>
        ) : (
          <ManageEventsConference
            eventList={currentState.events.value}
            conference={currentConference.conference}
          />
        )}
      </Container>
    )
  }
}

export default withRouter(ConferenceEventsManager)
