import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Box, Text } from 'theme-ui'

import PageSpinner from '../components/common/PageSpinner'
import ConferenceController from '../components/ConferenceController'
import {
  fetchConferencesById,
  singleConference,
} from '../redux/conferenceSlice'
import { Status } from '../redux/types'

function ConferenceControl({
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
        <Box />
      ) : status === Status.LOADING ? (
        <PageSpinner />
      ) : status === Status.FAILED ? (
        <Text>Failed to fetch data</Text>
      ) : (
        <ConferenceController conference={conference} />
      )}
    </Fragment>
  )
}

export default withRouter(ConferenceControl)
