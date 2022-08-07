import dayjs from 'dayjs'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Image, Text, Textarea } from 'theme-ui'

import { fetchEvents, selectAllEvents } from '../redux/eventsSlice'
import { Conference, Filter, Status } from '../redux/types'
import Circle from './common/Circle'
import ManageNavBar from './common/ManageNavBar'
import ManagerFragment from './common/ManagerFragment'
import PageSpinner from './common/PageSpinner'
import Schedule from './common/Schedule'

interface Props {
  conference: Conference
}

function ConferenceController({ conference }: Props): JSX.Element {
  const { events, status } = useSelector(selectAllEvents)
  const dispatch = useDispatch()

  useEffect(() => {
    const newFilter: Filter = {
      conferenceId: conference.id,
    }
    dispatch(fetchEvents(newFilter))
  }, [dispatch, conference.id])

  if (status === Status.IDLE) {
    return <div></div>
  }
  if (status === Status.LOADING) {
    return <PageSpinner />
  }
  if (status === Status.FAILED) {
    return <div> Failure Fetching Data</div>
  }

  const eventsFragment = events.value.map(event => {
    const starting = dayjs(new Date(event.startDate)).format('MMM D, h:mm A')
    const ending = dayjs(new Date(event.endDate)).format('MMM D, h:mm A')

    return (
      <div key={event.id}>
        <ManagerFragment
          capacity={event.capacity}
          category={event.category}
          conferenceId={event.conferenceId}
          createdBy={event.createdBy}
          description={event.description}
          endDate={ending}
          id={event.id}
          imageUrl={event.imageUrl}
          name={event.name}
          speaker={event.speaker}
          startDate={starting}
          status={event.status}
          summary={event.summary}
          tags={event.tags}
        />
      </div>
    )
  })

  return (
    <Fragment>
      <Image src={conference.bannerUrl} variant="fullwidth" />
      <Circle radius={100} margin={50} index="-2" />
      <Circle radius={70} margin={35} index="-1" />
      <ManageNavBar conferenceId={conference.id} sx={{ marginTop: '-7px' }} />
      <Container
        sx={{
          display: 'flex',
          mx: 'auto',
          width: '90%',
          '@media screen and (max-width:992px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Container
          sx={{
            minWidth: '60vw',
            maxWidth: '1500px',
          }}
        >
          <Text variant="title">About {conference.conferenceName}</Text>
          <Textarea
            readOnly
            sx={{ border: 'none', height: '30vh' }}
            value={conference.description}
          />
        </Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image
            src={conference.imageUrl}
            sx={{
              border: 'none',
              borderRadius: '200px',
              marginTop: '50px',
              maxWidth: '400px',
              minWidth: '150px',
              '@media screen and (max-width:992px)': {
                marginLeft: '30px',
                marginTop: '10px',
              },
            }}
            variant="medium"
          />
        </Container>
      </Container>
      <Container
        sx={{
          ml: 'auto',
          mr: '25vw',
          width: '30%',
        }}
      >
        <Text variant="title">Calendar</Text>
        <Schedule events={events.value} />
      </Container>
      <Container
        sx={{
          mx: 'auto',
          width: '85%',
        }}
      >
        <Text sx={{ fontSize: '40px', color: 'red', fontWeight: 900 }}>
          Events{' '}
        </Text>
        <Container
          sx={{
            mx: 'auto',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          variant="noMargin"
        >
          {eventsFragment}
        </Container>
      </Container>
      <Container
        sx={{
          marginTop: '-50px',
          mx: 'auto',
          width: '10%',
        }}
      >
        <Image src={conference.logoUrl} variant="logo" />
      </Container>
    </Fragment>
  )
}

export default ConferenceController
