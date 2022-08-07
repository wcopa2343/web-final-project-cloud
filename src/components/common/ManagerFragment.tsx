import Chance from 'chance'
import React, { Fragment } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button, Container, Flex, Image, Text, Textarea } from 'theme-ui'

import calendar from '../../assets/calendar.svg'
import { selectAuthInfo } from '../../redux/authSlice'
import { RemoveFromConference } from '../../redux/conferenceSlice'
import { fetchEvents } from '../../redux/eventsSlice'
import { AddRemoveEvent, Event, Filter, ModalTypes } from '../../redux/types'
import Chip from './Chip'
import ShowModal from './CustomModal'

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
                justifyContent: 'center',
                maxWidth: '10vw',
                minWidth: '5vw',
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

function ManagerFragment({
  conferenceId,
  endDate,
  id,
  imageUrl,
  name,
  speaker,
  startDate,
  summary,
  tags,
}: Event): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector(selectAuthInfo)

  const splitUrl = imageUrl.split('upload/')
  const imageResized = `${splitUrl[0]}upload/w_512/${splitUrl[1]}`

  const handleDelete = async () => {
    const conferenceToUpdate: AddRemoveEvent = {
      conferenceId: conferenceId,
      content: {
        actionType: 'Remove',
        eventsArray: [id],
      },
      token: auth.userInfo.token,
    }
    dispatch(RemoveFromConference(conferenceToUpdate))
    const newFilter: Filter = {
      createdBy: auth.userInfo.userId,
      conferenceId: conferenceId,
    }
    dispatch(fetchEvents(newFilter))
    ShowModal({
      onSuccess: () => {
        window.location.reload()
      },
      type: ModalTypes.DeleteSucceededModalValues,
    })
  }

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
            display: 'block',
            justifyContent: 'center',
            maxWidth: '400px',
            minWidth: '150px',
            position: 'relative',
          }}
        >
          <Link to={`/events/detail/${id}`}>
            <Image
              src={imageResized}
              sx={{
                borderRadius: '30px',
              }}
              variant="fragment"
            />
          </Link>
          <Flex
            sx={{
              bottom: '13%',
              position: 'absolute',
              right: '10%',
              zIndex: 999,
            }}
          >
            <Button
              onClick={() => handleDelete()}
              sx={{
                alignItems: 'center',
                display: 'flex',
                height: '50px',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: '10px',
                width: '50px',
              }}
              type="button"
              variant="orangeRed"
            >
              <ImCross />
            </Button>
            <Button
              onClick={() => history.push(`/events/update/${id}`)}
              sx={{
                alignItems: 'center',
                display: 'flex',
                height: '50px',
                justifyContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '50px',
              }}
              type="button"
              variant="green"
            >
              <FaPencilAlt />
            </Button>
          </Flex>
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

export default ManagerFragment
