/** @jsxRuntime classic */
/** @jsx  jsx */

import Chance from 'chance'
import dayjs from 'dayjs'
import { Fragment } from 'react'
import { CSVLink } from 'react-csv'
import { IoCalendarSharp, IoMegaphone } from 'react-icons/io5'
import Linkify from 'react-linkify'
import { useSelector } from 'react-redux'
import { Button, Container, Flex, Image, jsx, Spinner, Text } from 'theme-ui'

import { selectAuthInfo } from '../redux/authSlice'
import { singleEvent } from '../redux/eventSlice'
import { registeredForEvent } from '../redux/registrationSlice'
import { registrationsByEvent } from '../redux/registrationsSlice'
import { Event, Status } from '../redux/types'
import Chip from './common/Chip'
import OrganizerCard from './common/OrganizerCard'
import InviteButton from './InviteButton'
import JoinEventButton from './JoinEventButton'
import LeaveEventButton from './LeaveEventButton'
import MeetingLink from './MeetingLink'
import RegisteredCounter from './RegisteredCounter'
import RegisteredList from './RegisteredList'

interface ContainerProps {
  capacity: number
  endDate: string
  isLinkVisible: boolean | undefined
  eventId: string
  meetingLink: string | undefined
  speaker: string
  startDate: string
}

const InfoBox = ({
  capacity,
  endDate,
  eventId,
  isLinkVisible,
  meetingLink,
  speaker,
  startDate,
}: ContainerProps): JSX.Element => {
  const { registration, status } = useSelector(registeredForEvent)
  const { count } = useSelector(registrationsByEvent)
  const authState = useSelector(selectAuthInfo)
  localStorage.removeItem('prevLocation')
  const { registrationList } = useSelector(registrationsByEvent)
  const { event } = useSelector(singleEvent)
  const { token = '' } = authState.userInfo
  const userId: number | undefined = authState.userInfo.userId
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
  ]

  return (
    <Container
      sx={{
        backgroundColor: 'lightGray',
        maxWidth: '720px',
        minWidth: '350px',
        mx: 'auto',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <IoCalendarSharp
          sx={{ color: 'gray', height: '2rem', width: '2rem' }}
        />
        <Text
          sx={{
            color: 'gray',
            marginLeft: '1rem',
            marginRight: '5px',
            span: { display: 'block', fontSize: '.8em' },
          }}
          variant="title_3"
        >
          {startDate}
          <span>{endDate}</span>
        </Text>
      </Flex>
      <Text sx={{ color: 'gray' }} variant="title_3">
        <RegisteredCounter capacity={capacity} count={count} />
      </Text>
      <Flex sx={{ alignItems: 'center' }}>
        <IoMegaphone sx={{ color: 'gray', height: '2rem', width: '2rem' }} />
        <Text
          sx={{
            color: 'gray',
            marginLeft: '1rem',
            marginRight: '5px',
            span: { display: 'block', fontSize: '.8em' },
          }}
          variant="title_3"
        >
          {speaker}
        </Text>
      </Flex>
      <MeetingLink
        isLinkVisible={isLinkVisible}
        meetingLink={meetingLink}
        registration={registration}
      />
      {userId == event.createdBy ? (
        <CSVLink
          data={registrationList}
          filename={`${event.name}-Participants.csv`}
          headers={headers}
          sx={{ textDecoration: 'none' }}
        >
          <Button
            sx={{
              alignItems: 'left',
              display: 'flex',
              height: '45px',
              justifyContent: 'center',
              marginRight: 'auto',
              width: '190px',
            }}
            type="button"
            variant="green"
          >
            Download Participants
          </Button>
        </CSVLink>
      ) : null}
      <Flex sx={{ gap: '1em', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <InviteButton eventId={eventId} token={token} />
        {status === Status.LOADING ? (
          <Flex
            sx={{
              width: '150px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner
              sx={{
                color: 'orange',
                display: 'block',
              }}
            />
          </Flex>
        ) : registration ? (
          <LeaveEventButton />
        ) : (
          <JoinEventButton eventIsFull={count >= capacity} />
        )}
      </Flex>
    </Container>
  )
}

function ShowEvent({
  capacity,
  createdBy,
  description,
  endDate,
  id,
  imageUrl,
  isLinkVisible,
  meetingLink,
  name,
  speaker,
  startDate,
  tags,
}: Event): JSX.Element {
  const starting = dayjs(new Date(startDate)).format('MMM D, YYYY h:mm A')
  const ending = dayjs(new Date(endDate)).format('MMM D, YYYY h:mm A')

  const array = tags.split(',')

  let tagId = 0
  const tagArray = array.map(tag => {
    tagId++
    const chance = new Chance(tag.toLowerCase().trim())
    const color = chance.color({ format: 'hex' })
    return (
      <div key={tagId}>
        <Chip color={color} id={tagId} label={tag} name={tag} outline={false} />
      </div>
    )
  })

  return (
    <Fragment>
      <Image src={imageUrl} variant="fullwidth" />
      <Container
        sx={{
          alignItems: 'stretch',
          display: 'flex',
          mx: 'auto',
          width: '90%',
          '@media screen and (max-width:992px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Container sx={{ px: '0' }}>
          <Text variant="title">About {name}</Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Container sx={{ fontSize: '20px', whiteSpace: 'pre-wrap' }}>
              <Linkify>{description}</Linkify>
            </Container>
            <Container variant="noMargin">
              <Text sx={{ color: 'gray' }} variant="title">
                Tags
              </Text>
              <Flex sx={{ marginBottom: '10px', mx: '30px' }}>{tagArray}</Flex>
            </Container>
          </Flex>
        </Container>

        <Container sx={{ flexDirection: 'column' }} variant="noMargin">
          <InfoBox
            capacity={capacity}
            endDate={ending}
            eventId={id}
            isLinkVisible={isLinkVisible}
            meetingLink={meetingLink}
            speaker={speaker}
            startDate={starting}
          />
          <Flex sx={{ width: '90%', mx: 'auto' }}>
            <Container variant="noMargin">
              <OrganizerCard userId={createdBy} />
            </Container>
            <Container variant="noMargin">
              <RegisteredList />
            </Container>
          </Flex>
        </Container>
      </Container>
    </Fragment>
  )
}

export default ShowEvent
