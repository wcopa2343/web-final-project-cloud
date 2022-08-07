import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Text } from 'theme-ui'

import ShowConference from '../components/ShowConference'
import PageSpinner from '../components/common/PageSpinner'
import {
  fetchConferencesById,
  singleConference,
} from '../redux/conferenceSlice'
import { Status } from '../redux/types'

function ConferenceDetail({
  match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
  const { conference, status } = useSelector(singleConference)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchConferencesById(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <Fragment>
      {status === Status.IDLE ? (
        <Container></Container>
      ) : status === Status.LOADING ? (
        <PageSpinner />
      ) : status === Status.FAILED ? (
        <Text>Failed to fetch data</Text>
      ) : (
        <ShowConference
          bannerUrl={conference.bannerUrl}
          createdBy={conference.createdBy}
          conferenceName={conference.conferenceName}
          description={conference.description}
          endDate={conference.endDate}
          id={conference.id}
          imageUrl={conference.imageUrl}
          logoUrl={conference.logoUrl}
          startDate={conference.startDate}
          eventsId={conference.eventsId}
          status={conference.status}
        />
      )}
    </Fragment>
  )
}

export default ConferenceDetail
