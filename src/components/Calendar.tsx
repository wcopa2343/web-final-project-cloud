import FullCalendar, {
  EventContentArg,
  EventClickArg,
} from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Chance } from 'chance'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { Container, Text } from 'theme-ui'

import { Event } from '../redux/types'
import ManageNavBar from './common/ManageNavBar'

const colors = [
  '#3D7265',
  '#474044',
  '#3EBA9B',
  '#FEAD34',
  '#DA3C3D',
  '#FFD89E',
  '#D56364',
]

interface CalendarProps {
  conferenceId: string
  events: Event[]
}

interface CalendarEvent {
  color: string
  end: string
  extraParams: {
    _id: string
  }
  id: string
  start: string
  title: string
}

const eventBuilder = (events: Event[]): CalendarEvent[] => {
  const INITIAL_EVENTS: CalendarEvent[] = []
  let eventGuid = 0
  events.forEach(element => {
    const chance = new Chance(eventGuid)
    const eventColor = chance.integer({ min: 0, max: 6 })
    INITIAL_EVENTS.push({
      color: colors[eventColor],
      end: element.endDate,
      extraParams: {
        _id: element.id,
      },
      id: String(eventGuid),
      start: element.startDate,
      title: element.name,
    })
    eventGuid++
  })
  return INITIAL_EVENTS
}

const renderEventContent = (eventContent: EventContentArg): JSX.Element => {
  return (
    <Container variant="noMargin">
      <div data-tip={eventContent.event.start}>
        <Text sx={{ color: 'white' }} variant="summary">
          {eventContent.event.title}
        </Text>
      </div>
      <ReactTooltip
        backgroundColor="rgba(71, 64, 68, 0.8)"
        place="bottom"
        textColor="white"
      />
    </Container>
  )
}

function Calendar({ conferenceId, events }: CalendarProps): JSX.Element {
  const history = useHistory()

  const INITIAL_EVENTS = {
    events: eventBuilder(events),
  }

  let starting = new Date()
  INITIAL_EVENTS.events.forEach(element => {
    if (new Date(element.start) < starting) {
      starting = new Date(element.start)
    }
  })

  const handleEventClick = ({ event }: EventClickArg) => {
    history.push(`/events/detail/${event.extendedProps.extraParams._id}`)
  }

  return (
    <Fragment>
      <ManageNavBar conferenceId={conferenceId} />
      <Container
        sx={{
          marginTop: '10px',
          mx: 'auto',
          width: '60%',
        }}
      >
        <FullCalendar
          editable={false}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          headerToolbar={{
            center: 'title',
            left: 'prev,next',
            right: 'dayGridMonth,timeGridWeek today',
          }}
          height={'70vh'}
          initialDate={starting}
          initialEvents={INITIAL_EVENTS}
          initialView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          selectable={false}
        />
      </Container>
    </Fragment>
  )
}

export default Calendar
