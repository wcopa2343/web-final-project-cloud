import Chance from 'chance'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Card,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from 'theme-ui'

import Chip from './Chip'
import { Event } from '../../redux/types'

function EventCard({
  id,
  imageUrl,
  name,
  speaker,
  startDate,
  endDate,
  tags,
}: Event): JSX.Element {
  const start = dayjs(startDate).format('MMM DD, YYYY')
  const end = dayjs(endDate).format('MMM DD, YYYY')
  const color = 'orange'

  const array = tags.split(',')
  let tagId = 0

  const tagArray = array.map(tag => {
    tagId++
    const chance = new Chance(tag.toLowerCase().trim())
    const tagColor = chance.color({ format: 'hex' })
    return (
      <div key={tagId}>
        <Chip
          color={tagColor}
          id={tagId}
          label={tag}
          name={tag}
          outline={false}
        />
      </div>
    )
  })

  const splitUrl = imageUrl.split('upload/')
  const imageResized = `${splitUrl[0]}`

  return (
    <Card variant="primary">
      <Link to={`/events/detail/${id}`}>
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
          {name}
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
      <Divider />
      <Container
        sx={{
          alignContent: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          px: '10px',
        }}
        variant="noMargin"
      >
        <Text>{speaker}</Text>
        <Flex sx={{ marginBottom: '10px' }}>{tagArray}</Flex>
      </Container>
    </Card>
  )
}

export default EventCard
