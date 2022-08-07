import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Grid, Text } from 'theme-ui'

import EmptyPage from '../components/common/EmptyPage'
import EventCard from '../components/common/EventCard'
import PageSpinner from '../components/common/PageSpinner'
import ResponsiveContainer from '../components/custom-components/ResponsiveContainer'
import {
  fetchEvents,
  loadEvents,
  noMoreEvents,
  selectAllEvents,
} from '../redux/eventsSlice'
import { Event, Filter, Status } from '../redux/types'

function EventsList(): JSX.Element {
  const dispatch = useDispatch()
  const { events, status } = useSelector(selectAllEvents)
  const hasEvents = !!events.value.length
  const currentState = useSelector(selectAllEvents)
  const [page, setPage] = useState(1)
  let filter: Filter = {
    orderBy: 'name asc',
    status: 'published',
    skip: 0,
    top: 10,
  }

  useEffect(() => {
    dispatch(fetchEvents(filter))
    localStorage.removeItem('myFilter')
  }, [dispatch])

  function loadMoreEvents() {
    const localFilter: string | null = localStorage.getItem('myFilter')
    filter = localFilter != null ? JSON.parse(localFilter) : {}
    if (page < currentState.events.totalPages) {
      dispatch(
        loadEvents({ ...filter, skip: page, status: 'published', top: 10 }),
      )
      setPage(page => page + 1)
    } else {
      setPage(1)
      dispatch(noMoreEvents())
      localStorage.removeItem('myFilter')
    }
  }

  if (status === Status.IDLE) {
    return <div></div>
  }
  if (status === Status.LOADING) {
    return <PageSpinner />
  }
  if (status === Status.FAILED) {
    return <div> Failure Fetching Data</div>
  }

  const eventsList = events.value.map((event: Event) => {
    return (
      <Box key={event.id} sx={{ placeSelf: 'center' }}>
        <EventCard
          capacity={event.capacity}
          category={event.category}
          createdBy={event.createdBy}
          description={event.description}
          endDate={event.endDate}
          id={event.id}
          imageUrl={event.imageUrl}
          name={event.name}
          speaker={event.speaker}
          startDate={event.startDate}
          status={event.status}
          summary={event.summary}
          tags={event.tags}
        />
      </Box>
    )
  })
  return (
    <ResponsiveContainer>
      {hasEvents ? (
        <InfiniteScroll
          dataLength={currentState.events.totalPages}
          endMessage={
            <Container sx={{ width: 'auto', textAlign: 'center' }}>
              <AiOutlineCheckCircle sx={{ display: 'block' }} size={64} />
              <Text variant="title_4">
                There are no more Events to show right now
              </Text>
            </Container>
          }
          hasMore={currentState.hasMore}
          loader={<p></p>}
          next={() => loadMoreEvents()}
        >
          <Grid
            width={['auto', null, 320]}
            sx={{ justifyContent: 'stretch', my: '50px', rowGap: '50px' }}
          >
            {eventsList}
          </Grid>
        </InfiniteScroll>
      ) : (
        <EmptyPage text="There is no event that matches this search">
          <RiErrorWarningLine size="5em" color="orange" />
        </EmptyPage>
      )}
    </ResponsiveContainer>
  )
}

export default EventsList
