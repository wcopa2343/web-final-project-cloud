/** @jsxRuntime classic */
/** @jsx  jsx */

import dayjs from 'dayjs'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Flex, Image, jsx, Text, Textarea } from 'theme-ui'

import { fetchEvents, selectAllEvents } from '../redux/eventsSlice'
import { Conference, Filter, Status } from '../redux/types'
import { fetchById } from '../redux/userSlice'
import Circle from './common/Circle'
import EventFragment from './common/EventFragment'
import OrganizerCard from './common/OrganizerCard'
import PageSpinner from './common/PageSpinner'
import Schedule from './common/Schedule'

function ShowConference({
  bannerUrl,
  createdBy,
  conferenceName,
  description,
  endDate,
  id,
  imageUrl,
  logoUrl,
}: Conference): JSX.Element {
  const { events, status } = useSelector(selectAllEvents)
  const dispatch = useDispatch()

  useEffect(() => {
    const newFilter: Filter = {
      conferenceId: id,
    }
    dispatch(fetchEvents(newFilter))
  }, [dispatch, id])

  useEffect(() => {
    const createdId = +createdBy
    dispatch(fetchById(createdId))
  }, [dispatch, createdBy])

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
        <EventFragment
          capacity={event.capacity}
          category={event.category}
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
      <Image src={bannerUrl} variant="fullwidth" />
      <Circle radius={100} margin={50} index="-2" />
      <Circle radius={70} margin={35} index="-1" />
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
          <Text variant="title">About {conferenceName}</Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Textarea
              readOnly
              sx={{ border: 'none', height: '30vh' }}
              value={description}
            />
            <Flex>
              <Container variant="noMargin">
                <OrganizerCard userId={createdBy} />
              </Container>
              <Container variant="noMargin">
                <Text variant="title_2">Calendar</Text>
                <Schedule events={events.value} />
              </Container>
            </Flex>
          </Flex>
        </Container>

        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image
            src={imageUrl}
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
        <Image src={logoUrl} variant="logo" />
      </Container>
    </Fragment>
  )
}

export default ShowConference
