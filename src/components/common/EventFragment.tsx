/** @jsxRuntime classic */
/** @jsx jsx */

import Chance from 'chance'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Flex, Image, jsx, Text, Textarea } from 'theme-ui'

import Chip from './Chip'
import calendar from '../../assets/calendar.svg'
import { Event } from '../../redux/types'

interface ContainerProps {
  endDate: string
  name: string
  speaker: string
  startDate: string
  summary: string
  tags: string
}

const InfoBox = (props: ContainerProps): JSX.Element => {
  const array = props.tags.split(',')

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

  return (
    <Container sx={{}} {...props}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        variant="noMargin"
      >
        <Text
          sx={{
            color: 'orange',
            marginRight: '5px',
            span: { display: 'block', fontSize: '.8em' },
          }}
          variant="title"
        >
          {props.name}
        </Text>
        <Container
          sx={{
            display: 'flex',
            '@media screen and (max-width:992px)': {
              flexDirection: 'column',
            },
          }}
          variant="noMargin"
        >
          <Textarea
            readOnly
            sx={{ border: 'none', height: '15vh' }}
            value={props.summary}
          />
          <Flex>
            <Container sx={{ width: '150px' }}>
              <Image alt="Logo" src={calendar} sx={{ objectFit: 'cover' }} />
            </Container>

            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: '5vw',
                maxWidth: '10vw',
                justifyContent: 'center',
              }}
              variant="noMargin"
            >
              <Text variant="summary">{props.startDate}</Text>
              <Text variant="summary_2">{props.endDate}</Text>
            </Container>
          </Flex>
        </Container>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text sx={{ color: 'gray' }} variant="title_3">
            By {props.speaker}
          </Text>
          <Flex>{tagArray}</Flex>
        </Container>
      </Container>
    </Container>
  )
}

function EventFragment({
  endDate,
  id,
  imageUrl,
  name,
  speaker,
  startDate,
  summary,
  tags,
}: Event): JSX.Element {
  const splitUrl = imageUrl.split('upload/')
  const imageResized = `${splitUrl[0]}upload/w_512/${splitUrl[1]}`

  return (
    <Fragment>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          '@media screen and (max-width:992px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '400px',
            minWidth: '150px',
          }}
        >
          <Link to={`/events/detail/${id}`}>
            <Image src={imageResized} variant="fragment" />
          </Link>
        </Container>
        <InfoBox
          endDate={endDate}
          name={name}
          speaker={speaker}
          startDate={startDate}
          summary={summary}
          sx={{ maxWidth: '950px', minWidth: '350px' }}
          tags={tags}
        />
      </Container>
    </Fragment>
  )
}

export default EventFragment
