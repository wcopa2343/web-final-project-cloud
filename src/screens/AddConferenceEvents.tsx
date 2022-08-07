import React, { useEffect } from 'react'
import { FaRegCalendarPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'
import { Box, Button, Container, Flex, Text } from 'theme-ui'

import EmptyPage from '../components/common/EmptyPage'
import ManageNavBar from '../components/common/ManageNavBar'
import PageSpinner from '../components/common/PageSpinner'
import { TableForAddConferenceEvents } from '../components/TableForAddConferenceEvents'
import { selectAuthInfo } from '../redux/authSlice'
import {
  fetchConferencesById,
  InsertIntoConference,
  singleConference,
} from '../redux/conferenceSlice'
import { fetchEvents, selectAllEvents } from '../redux/eventsSlice'
import { AddRemoveEvent, EventStatus, Filter, Status } from '../redux/types'
import toast from '../utils/toast'

function AddConferenceEvents({
  match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
  const dispatch = useDispatch()
  const conferenceId: string = match.params.id
  const { conference, patchStatus } = useSelector(singleConference)
  const currentState = useSelector(selectAllEvents)
  const currentUser = useSelector(selectAuthInfo)
  const currentUserId = currentUser.userInfo.userId
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchConferencesById(conferenceId))
    const newFilter: Filter = {
      createdBy: currentUserId,
      conferenceId: 'none',
    }
    dispatch(fetchEvents(newFilter))
  }, [dispatch, currentUser])

  const handleClickContinue = (eventsArray: string[]) => {
    const params: AddRemoveEvent = {
      conferenceId: conferenceId,
      content: {
        actionType: 'Insert',
        eventsArray: eventsArray,
      },
      token: currentUser.userInfo.token,
    }
    dispatch(InsertIntoConference(params))
    history.push(`/conferences/control/${conferenceId}`)
  }

  if (currentState.status === Status.IDLE) {
    return <Container />
  } else if (currentState.status === Status.LOADING) {
    return <PageSpinner />
  } else if (currentState.status === Status.FAILED) {
    return <Container> Failure Fetching Data</Container>
  } else {
    return (
      <Box sx={{ height: '-webkit-fill-available' }}>
        <ManageNavBar conferenceId={conference.id} />
        <Flex
          sx={{
            alignContent: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            mx: 'auto',
            width: '90vw',
          }}
        >
          <Text variant="title_4">Unassigned Events</Text>
          <Text variant="title_4">{conference.conferenceName}</Text>
        </Flex>
        {!currentState.events.value.length ? (
          <>
            <EmptyPage text="No events yet">
              <FaRegCalendarPlus size="5em" color="#474044" />
            </EmptyPage>
            <Flex
              sx={{
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: '20px',
                mx: 'auto',
                width: '90vw',
              }}
            >
              <Button
                onClick={() =>
                  history.push(`/conferences/control/${conferenceId}`)
                }
                sx={{
                  fontSize: '23px',
                  '&:hover': { fontSize: '24px' },
                }}
                variant="green"
              >
                Go Back
              </Button>
            </Flex>
          </>
        ) : (
          <TableForAddConferenceEvents
            eventList={currentState.events.value}
            handleClickContinue={(eventsArray: string[]) =>
              handleClickContinue(eventsArray)
            }
          />
        )}
      </Box>
    )
  }
}

export default withRouter(AddConferenceEvents)
