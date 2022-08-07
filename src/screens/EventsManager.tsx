import React, { useEffect } from 'react'
import { FaRegCalendarPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Container, Flex, Text } from 'theme-ui'

import EmptyPage from '../components/common/EmptyPage'
import PageSpinner from '../components/common/PageSpinner'
import { Table } from '../components/Table'
import { selectAuthInfo } from '../redux/authSlice'
import { fetchEvents, selectAllEvents } from '../redux/eventsSlice'
import { Filter, Status } from '../redux/types'

function EventsManage(): JSX.Element {
  const dispatch = useDispatch()
  const currentState = useSelector(selectAllEvents)
  const currentUser = useSelector(selectAuthInfo)
  const history = useHistory()

  useEffect(() => {
    const newFilter: Filter = {
      createdBy: currentUser.userInfo.userId,
    }
    dispatch(fetchEvents(newFilter))
  }, [dispatch, currentUser])

  if (currentState.status === Status.IDLE) {
    return <Container></Container>
  } else if (currentState.status === Status.LOADING) {
    return <PageSpinner />
  } else if (currentState.status === Status.FAILED) {
    return <Container> Failure Fetching Data</Container>
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
          <Text variant="title_4">Manage my Events</Text>
          <Button
            onClick={() => history.push('/events/create')}
            sx={{
              fontSize: '23px',
              '&:hover': { fontSize: '24px' },
            }}
            variant="green"
          >
            New Event
          </Button>
        </Flex>
        {!currentState.events.value.length ? (
          <EmptyPage text="No events yet">
            <FaRegCalendarPlus size="5em" color="#474044" />
          </EmptyPage>
        ) : (
          <Table eventList={currentState.events.value} />
        )}
      </Container>
    )
  }
}

export default EventsManage
