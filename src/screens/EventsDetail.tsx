import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import PageSpinner from '../components/common/PageSpinner'
import ShowEvent from '../components/ShowEvent'
import { selectAuthInfo } from '../redux/authSlice'
import { fetchById, singleEvent } from '../redux/eventSlice'
import {
  checkEventRegistrationByUser,
  registeredForEvent,
} from '../redux/registrationSlice'
import { getEventRegistrations } from '../redux/registrationsSlice'
import { Status } from '../redux/types'

function EventsDetail({
  match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
  const dispatch = useDispatch()
  const { event, status } = useSelector(singleEvent)
  const registration = useSelector(registeredForEvent)
  const authState = useSelector(selectAuthInfo)
  const token = authState.userInfo.token
  const userId = authState.userInfo.userId

  useEffect(() => {
    dispatch(fetchById({ id: match.params.id, token }))
    dispatch(
      checkEventRegistrationByUser({ eventId: match.params.id, userId, token }),
    )
  }, [dispatch, match.params.id, userId, token])

  useEffect(() => {
    dispatch(getEventRegistrations({ eventId: match.params.id }))
  }, [dispatch, registration, match.params.id])

  if (status === Status.IDLE) {
    return <Fragment></Fragment>
  }
  if (status === Status.LOADING) {
    return <PageSpinner />
  }
  if (status === Status.FAILED) {
    return <Fragment></Fragment>
  }
  return (
    <Fragment>
      <ShowEvent
        capacity={event.capacity}
        category={event.category}
        createdBy={event.createdBy}
        endDate={event.endDate}
        description={event.description}
        imageUrl={event.imageUrl}
        id={event.id}
        isLinkVisible={event.isLinkVisible}
        meetingLink={event.meetingLink}
        name={event.name}
        speaker={event.speaker}
        startDate={event.startDate}
        status={event.status}
        summary={event.summary}
        tags={event.tags}
      />
    </Fragment>
  )
}

export default EventsDetail
