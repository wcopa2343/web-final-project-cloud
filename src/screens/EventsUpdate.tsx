import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import PageSpinner from '../components/common/PageSpinner'
import UpdateEventForm from '../components/UpdateEventForm'
import { selectAuthInfo } from '../redux/authSlice'
import { fetchById, singleEvent } from '../redux/eventSlice'

const EventsUpdate = ({
  match,
}: RouteComponentProps<{ id: string }>): JSX.Element => {
  const dispatch = useDispatch()
  const { event, status } = useSelector(singleEvent)
  const authState = useSelector(selectAuthInfo)
  const token = authState.userInfo.token

  useEffect(() => {
    dispatch(fetchById({ id: match.params.id, token }))
  }, [dispatch, match.params.id])

  if (status === 'idle') {
    return <div></div>
  }
  if (status === 'loading') {
    return <PageSpinner />
  }
  if (status === 'failure') {
    return <div> </div>
  }
  return (
    <div>
      <UpdateEventForm
        capacity={event.capacity}
        category={event.category}
        createdBy={event.createdBy}
        description={event.description}
        endDate={event.endDate}
        id={event.id}
        imageUrl={event.imageUrl}
        isLinkVisible={event.isLinkVisible}
        meetingLink={event.meetingLink}
        name={event.name}
        speaker={event.speaker}
        startDate={event.startDate}
        status={event.status}
        summary={event.summary}
        tags={event.tags}
      />
    </div>
  )
}

export default EventsUpdate
