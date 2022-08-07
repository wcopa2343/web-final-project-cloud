import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Grid, Text } from 'theme-ui'

import ConferenceCard from '../components/common/ConferenceCard'
import PageSpinner from '../components/common/PageSpinner'
import ResponsiveContainer from '../components/custom-components/ResponsiveContainer'
import {
  fetchConferences,
  selectAllConferences,
} from '../redux/conferencesSlice'
import {
  Conference,
  ConferencesFilter,
  EventStatus,
  Status,
} from '../redux/types'

function ConferenceList(): JSX.Element {
  const dispatch = useDispatch()
  const { conferences, status } = useSelector(selectAllConferences)

  const filter: ConferencesFilter = {
    status: EventStatus.PUBLISHED,
  }

  useEffect(() => {
    dispatch(fetchConferences(filter))
  }, [dispatch])

  if (status === Status.IDLE) {
    return <Fragment></Fragment>
  }
  if (status === Status.LOADING) {
    return <PageSpinner />
  }
  if (status === Status.FAILED) {
    return <Text> Failure Fetching Data</Text>
  }

  const conferencesList = conferences.map((conference: Conference) => {
    return (
      <Box key={conference.id} sx={{ placeSelf: 'center' }}>
        <ConferenceCard
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
      </Box>
    )
  })

  return (
    <ResponsiveContainer>
      <Grid
        width={['auto', null, 320]}
        sx={{ justifyContent: 'stretch', my: '50px', rowGap: '50px' }}
      >
        {conferencesList}
      </Grid>
    </ResponsiveContainer>
  )
}

export default ConferenceList
