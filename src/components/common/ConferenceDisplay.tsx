import dayjs from 'dayjs'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Container, Flex, Image, Text } from 'theme-ui'

import { Conference } from '../../redux/types'

function ConferenceDisplay({
  bannerUrl,
  conferenceName,
  endDate,
  id,
  logoUrl,
  startDate,
}: Conference): JSX.Element {
  const history = useHistory()

  const startDay = dayjs(startDate).format('DD')
  const startMonth = dayjs(startDate).format('MMM')
  const endDay = dayjs(endDate).format('DD')
  const endMonth = dayjs(endDate).format('MMM')

  return (
    <Card variant="manage">
      <Link to={`/conferences/control/${id}`}>
        <Image
          src={bannerUrl}
          sx={{
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            height: '300px',
            objectFit: 'cover',
            width: '550px',
          }}
          variant="card"
        />
      </Link>
      <Text
        sx={{
          color: 'orange',
          marginBottom: '20px',
          overflowWrap: 'break-word',
          px: '28px',
        }}
        variant="title_3"
      >
        {conferenceName}
      </Text>
      <Container
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          ml: '30px',
          mx: 'auto',
          width: '90%',
        }}
        variant="noMargin"
      >
        <Container
          sx={{ display: 'flex', flexDirection: 'row' }}
          variant="noMargin"
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
            variant="noMargin"
          >
            <Text variant="summary_2">Starts</Text>
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
              variant="noMargin"
            >
              <Text
                sx={{ color: 'orange' }}
                variant="title_3"
              >{`${startDay}`}</Text>
              <Text
                sx={{ color: 'orange' }}
                variant="summary_1"
              >{`/${startMonth}`}</Text>
            </Container>
          </Container>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              ml: '5px',
            }}
            variant="noMargin"
          >
            <Text variant="summary_2">Ends</Text>
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
              variant="noMargin"
            >
              <Text
                variant="title_3"
                sx={{ color: 'darkGreen' }}
              >{`${endDay}`}</Text>
              <Text
                sx={{ color: 'darkGreen' }}
                variant="summary_1"
              >{`/${endMonth}`}</Text>
            </Container>
          </Container>
        </Container>
        <Container variant="noMargin">
          <Image
            src={logoUrl}
            sx={{
              borderRadius: '5px',
              marginLeft: '30px',
              marginTop: '10px',
              width: '150px',
            }}
          />
        </Container>
        <Container variant="noMargin">
          <Flex>
            <Button
              onClick={() => history.push(`/conferences/update/${id}`)}
              sx={{
                alignItems: 'center',
                display: 'flex',
                height: '60px',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: '20px',
                width: '70px',
              }}
              type="button"
              variant="green"
            >
              <FiEdit size="25" />
            </Button>
          </Flex>
        </Container>
      </Container>
    </Card>
  )
}

export default ConferenceDisplay
