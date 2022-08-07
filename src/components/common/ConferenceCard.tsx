import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, Grid, Image } from 'theme-ui'
import { Conference } from '../../redux/types'

function ConferenceCard({
  bannerUrl,
  conferenceName,
  endDate,
  id,
  startDate,
}: Conference): JSX.Element {
  const start = dayjs(startDate).format('MMM DD, YYYY')
  const end = dayjs(endDate).format('MMM DD, YYYY')
  const color = 'orange'

  const splitUrl = bannerUrl.split('upload/')
  const imageResized = `${splitUrl[0]}upload/w_512/${splitUrl[1]}`

  return (
    <Card variant="primary">
      <Link to={`/conferences/detail/${id}`}>
        <Image src={imageResized} variant="card" />
      </Link>
      <Grid columns={[1, '1fr 0.8fr']}>
        <Box
          sx={{
            color: `${color}`,
            fontSize: 2,
            fontWeight: 'bold',
            margin: '10px',
            overflowWrap: 'break-word',
          }}
          variant="title"
        >
          {conferenceName}
        </Box>
        <Box
          sx={{
            color: 'gray',
            fontSize: 2,
            margin: '10px',
            span: {
              fontSize: '.7em',
              display: 'block',
            },
          }}
          variant="title"
        >
          {start}
          <span>{end}</span>
        </Box>
      </Grid>
    </Card>
  )
}

export default ConferenceCard
