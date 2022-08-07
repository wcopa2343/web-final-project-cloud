import React, { useEffect } from 'react'
import { FaRegCalendarPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Container, Flex, Grid, Text } from 'theme-ui'

import ConferenceDisplay from '../components/common/ConferenceDisplay'
import EmptyPage from '../components/common/EmptyPage'
import PageSpinner from '../components/common/PageSpinner'
import { selectAuthInfo } from '../redux/authSlice'
import {
  fetchConferences,
  selectAllConferences,
} from '../redux/conferencesSlice'
import { Conference, ConferencesFilter, Status } from '../redux/types'

function ConferenceManager(): JSX.Element {
  const dispatch = useDispatch()
  const { conferences, status } = useSelector(selectAllConferences)
  const currentUser = useSelector(selectAuthInfo)
  const history = useHistory()

  useEffect(() => {
    const filter: ConferencesFilter = {
      createdby: currentUser.userInfo.userId,
    }
    dispatch(fetchConferences(filter))
  }, [dispatch, currentUser])

  const conferencesList = conferences.map((conference: Conference) => {
    return (
      <div key={conference.id}>
        <ConferenceDisplay
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
      </div>
    )
  })

  if (status === Status.IDLE) {
    return <Container />
  } else if (status === Status.LOADING) {
    return <PageSpinner />
  } else if (status === Status.FAILED) {
    return <Container> Failure Fetching Data</Container>
  } else {
    return (
      <Container variant="noMargin" sx={{ height: '-webkit-fill-available' }}>
        <Flex
          sx={{
            alignContent: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            mx: 'auto',
            width: '90vw',
          }}
        >
          <Text variant="title_4">Manage my Conferences</Text>
          <Button
            onClick={() => history.push('/conferences/create')}
            sx={{
              fontSize: '23px',
              width: '220px',
              '&:hover': { fontSize: '24px' },
            }}
            variant="green"
          >
            New Conference
          </Button>
        </Flex>
        {!conferences.length ? (
          <EmptyPage text="No conferences yet">
            <FaRegCalendarPlus size="5em" color="#474044" />
          </EmptyPage>
        ) : (
          <Grid
            columns={[1, 1, 2]}
            gap={'100px'}
            sx={{
              marginLeft: '150px',
              marginRight: '100px',
              marginTop: '50px',
            }}
          >
            {conferencesList}
          </Grid>
        )}
      </Container>
    )
  }
}

export default ConferenceManager
