import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import Calendar from '../components/Calendar'
import PageSpinner from '../components/common/PageSpinner'
import TextMessage from '../components/common/TextMessage'
import { fetchEvents, selectAllEvents } from '../redux/eventsSlice'
import { Filter, Status } from '../redux/types'

function ConferenceCalendar({
  match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
  const { events, status } = useSelector(selectAllEvents)

  const dispatch = useDispatch()

  useEffect(() => {
    const newFilter: Filter = {
      conferenceId: match.params.id,
    }
    dispatch(fetchEvents(newFilter))
  }, [dispatch, match.params.id])

  return (
    <Fragment>
      {status === Status.IDLE ? (
        <div></div>
      ) : status === Status.LOADING ? (
        <PageSpinner />
      ) : status === Status.FAILED ? (
        <TextMessage type="error">Failure Fetching data</TextMessage>
      ) : (
        <Calendar conferenceId={match.params.id} events={events.value} />
      )}
    </Fragment>
  )
}

export default ConferenceCalendar
