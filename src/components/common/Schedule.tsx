import dayjs from 'dayjs'
import React, { Fragment, useState } from 'react'
import { Button, Container, Flex, Link, Text } from 'theme-ui'

import { Event } from '../../redux/types'
import ListItem from './ListItem'

interface ScheduleProps {
  events: Event[]
}

function Schedule({ events }: ScheduleProps): JSX.Element {
  const [active, setActive] = useState('')

  const dates = events.map(item => {
    return {
      id: item.id,
      date: dayjs(new Date(item.startDate)).format('DD/MM'),
      hour: dayjs(new Date(item.startDate)).format('h:mm A'),
      name: item.name,
    }
  })

  dates.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))

  const duplicates = dates.filter(
    (item, index, self) => index === self.findIndex(t => t.date === item.date),
  )

  const days = duplicates.map(item => {
    return (
      <div key={item.date}>
        <Button onClick={() => setActive(item.date)} variant="sizeLink">
          {item.date}
        </Button>
      </div>
    )
  })

  const dateFilter = dates.filter(item => {
    return item.date === active
  })

  dateFilter.sort((a, b) => (a.hour > b.hour ? 1 : b.hour > a.hour ? -1 : 0))

  const datesList = dateFilter.map(item => {
    return (
      <div key={item.name}>
        <Container
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            ml: '40px',
          }}
        >
          <Text sx={{ mr: '20px', color: 'darkGreen' }} variant="title_2">
            {item.hour}
          </Text>
          <ListItem background="lightGray" color="red" size={35} />
          <Link
            href={`/events/detail/${item.id}`}
            sx={{
              color: 'gray',
              fontSize: 4,
              fontWeight: 600,
              ml: '20px',
              textDecoration: 'none',
            }}
          >
            {item.name}
          </Link>
        </Container>
      </div>
    )
  })

  return (
    <Fragment>
      <Flex>{days}</Flex>
      <Container variant="noMargin">{datesList}</Container>
    </Fragment>
  )
}

export default Schedule
