/** @jsxRuntime classic */

/** @jsx  jsx */
import dayjs from 'dayjs'
import { Form, Formik } from 'formik'
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Box, Container, Label, jsx, Text } from 'theme-ui'
import * as Yup from 'yup'

import { selectAuthInfo } from '../redux/authSlice'
import { modifyEvent, removeEvent } from '../redux/eventsSlice'
import {
  Event,
  EventDeleteData,
  EventStatus,
  EventUpdateData,
  ModalTypes,
  UpdateEvent,
} from '../redux/types'
import '../styles/modal.css'
import { createImageUrl } from '../utils/imageClient'
import ChipInput from './common/ChipInput'
import ShowModal from './common/CustomModal'
import ImageUpload from './common/ImageUpload'
import PageSpinner from './common/PageSpinner'
import RadioItem from './common/RadioItem'
import TextAreaInput from './common/TextAreaInput'
import TextInput from './common/TextInput'
import ToggleSwitch from './common/ToggleSwitch'

const UpdateEventSchema = Yup.object().shape({
  capacity: Yup.number()
    .min(1, 'The capacity cannot be for less than 0 participants')
    .max(1000, 'The capacity cannot be for more than 1000 participants')
    .required('Capacity field is required'),
  category: Yup.string()
    .min(2, 'The category cannot have less than 2 characters')
    .max(50, 'The category cannot have more than 50 characters')
    .required('Category field is required'),
  description: Yup.string()
    .min(10, 'The description cannot have less than 10 characters')
    .max(5000, 'The description cannot have more than 5000 characters')
    .required('Description field is required'),
  endDate: Yup.date()
    .required('End date field is required')
    .min(Yup.ref('startDate'), 'The end date cannot be before the start date')
    .test('date diff', 'An Event should last at least 15 minutes', function (
      values,
    ) {
      const dateEnd = values?.toJSON()
      const dateStart = this.parent.startDate.toJSON()
      return dayjs(dateEnd).diff(dayjs(dateStart), 'minute') >= 15
    }),
  meetingLink: Yup.string().url('Meeting link should be a valid URL'),
  name: Yup.string()
    .min(2, 'The name cannot have less than 2 characters')
    .max(50, 'The name cannot have more than 50 characters')
    .required('Name field is required'),
  speaker: Yup.string()
    .min(2, 'The speaker cannot have less than 2 characters')
    .max(50, 'The speaker cannot have more than 50 characters')
    .required('Speaker field is required'),
  startDate: Yup.date().required('Start date field is required'),
  summary: Yup.string()
    .min(10, 'The summary cannot have less than 10 characters')
    .max(250, 'The summary cannot have more than 250 characters')
    .required('Summary field is required'),
  tags: Yup.string()
    .min(2, 'The tags cannot have less than 2 characters')
    .max(50, 'The tags cannot have more than 50 characters')
    .required('Tags field is required'),
})

function UpdateEventForm({
  capacity,
  category,
  conferenceId,
  createdBy,
  description,
  endDate,
  id,
  imageUrl,
  isLinkVisible = false,
  meetingLink,
  name,
  speaker,
  startDate,
  status,
  summary,
  tags,
}: Event): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()

  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState<boolean>(false)

  const auth = useSelector(selectAuthInfo)
  const token = auth.userInfo.token
  const [tagsInput, setTagsInput] = useState<string[]>(
    tags === ('' || undefined) ? [] : tags.split(','),
  )
  const [categoryInput, setCategory] = useState<string[]>(
    category === ('' || undefined) ? [] : category.split(','),
  )
  const [isLinkVisibleState, setIsLinkVisibleState] = useState<boolean>(
    isLinkVisible,
  )

  const ending = dayjs(endDate).format('YYYY-MM-DDTHH:mm')
  const starting = dayjs(startDate).format('YYYY-MM-DDTHH:mm')

  const initialValues: Event = {
    capacity: capacity,
    category: category,
    conferenceId: conferenceId,
    createdBy: createdBy,
    description: description,
    endDate: ending,
    id: id,
    imageUrl: imageUrl,
    isLinkVisible: isLinkVisible,
    meetingLink: meetingLink,
    name: name,
    speaker: speaker,
    startDate: starting,
    status: status,
    summary: summary,
    tags: tags,
  }

  const removeTag = (indexToRemove: number) => {
    setTagsInput([...tagsInput.filter((_, index) => index !== indexToRemove)])
  }
  const addTag = (newTags: string[]) => {
    setTagsInput([...tagsInput, ...newTags])
  }

  const addCategory = (newCategories: string[]) => {
    setCategory([...categoryInput, ...newCategories])
  }

  const removeCategory = (indexToRemove: number) => {
    setCategory([
      ...categoryInput.filter((_, index) => index !== indexToRemove),
    ])
  }

  const sendEvent = async (values: Event) => {
    let img = imageUrl
    if (file != null) {
      setLoading(true)
      img = await createImageUrl(file)
    }

    const updatedEvent: UpdateEvent = {
      capacity: values.capacity,
      category: categoryInput.join(','),
      conferenceId: conferenceId,
      createdBy: createdBy,
      description: values.description,
      endDate: values.endDate,
      id: id,
      imageUrl: img,
      isLinkVisible: isLinkVisibleState,
      meetingLink: values.meetingLink,
      name: values.name,
      speaker: values.speaker,
      startDate: values.startDate,
      status: values.status,
      summary: values.summary,
      tags: tagsInput.join(','),
    }

    const eventToUpdate: EventUpdateData = {
      eventId: updatedEvent.id,
      body: updatedEvent,
      token: token,
    }

    if (img != null) {
      dispatch(modifyEvent(eventToUpdate))
    }

    setLoading(false)
    history.goBack()
  }

  const handleDelete = (id: string) => {
    const eventToDelete: EventDeleteData = {
      eventId: id,
      token: auth.userInfo.token,
    }
    dispatch(removeEvent(eventToDelete))
    ShowModal({
      onSuccess: () => {
        history.goBack()
      },
      type: ModalTypes.DeleteSucceededModalValues,
    })
  }

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdateEventSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false)
          ShowModal({
            onSuccess: () => sendEvent(values),
            type: ModalTypes.ConfirmUpdateModalValues,
          })
        }}
      >
        {loading ? (
          <PageSpinner />
        ) : (
          formik => (
            <Form onSubmit={formik.handleSubmit}>
              <ImageUpload
                alt={imageUrl}
                fromChild={(local: File) => setFile(local)}
              />
              <Container
                sx={{
                  display: 'flex',
                  mx: 'auto',
                  width: '90%',
                  '@media screen and (max-width:992px)': {
                    flexDirection: 'column',
                  },
                }}
              >
                <Container>
                  <Text variant="title">About </Text>
                  <TextAreaInput
                    label=""
                    name="description"
                    placeholder="Description of the event"
                    sx={{
                      border: '1px solid gray',
                      maxHeight: '65vh',
                      minHeight: '60vh',
                    }}
                    type="text"
                  />
                </Container>
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '800px',
                    minWidth: '350px',
                  }}
                >
                  <TextInput
                    label=""
                    name="name"
                    placeholder="Event Name"
                    sx={{
                      fontSize: '28px',
                      marginBottom: '20px',
                      mx: 'auto',
                      width: '95%',
                    }}
                    type="text"
                  />
                  <Container sx={{ backgroundColor: 'lightGray' }}>
                    <TextInput
                      label="Start date"
                      name="startDate"
                      placeholder={starting}
                      sx={{ fontSize: '18px' }}
                      type="datetime-local"
                    />
                    <TextInput
                      label="End date"
                      name="endDate"
                      placeholder={ending}
                      sx={{ fontSize: '18px' }}
                      type="datetime-local"
                    />
                    <TextAreaInput
                      label="Summary"
                      name="summary"
                      placeholder="Summary"
                      sx={{
                        fontSize: '16px',
                        my: 0,
                        p: '5px',
                      }}
                      type="text"
                    />
                    <TextInput
                      label="Speaker"
                      name="speaker"
                      placeholder="Event Speaker"
                      type="text"
                    />
                    <TextInput
                      label="Meeting Link"
                      name="meetingLink"
                      placeholder="http://..."
                      type="url"
                    />
                    <Box>
                      <Label>Meeting link visibility</Label>
                      <ToggleSwitch
                        isToggled={isLinkVisibleState}
                        onToggle={() =>
                          setIsLinkVisibleState(!isLinkVisibleState)
                        }
                      />
                    </Box>
                    <ChipInput
                      addChip={addTag}
                      chips={tagsInput}
                      label="Tags"
                      max={10}
                      name="tags"
                      placeholder="Tags"
                      removeChip={removeTag}
                      type="text"
                    />
                    <ChipInput
                      chips={categoryInput}
                      label="Categories"
                      max={10}
                      name="category"
                      addChip={addCategory}
                      removeChip={removeCategory}
                      placeholder="Categories"
                      type="text"
                    />
                    <TextInput
                      name="capacity"
                      label="Capacity"
                      placeholder="Capacity"
                      type="number"
                    />
                    <Container
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        width: '75%',
                        '@media screen and (max-width:1400px)': {
                          flexDirection: 'column',
                        },
                      }}
                    >
                      <RadioItem
                        color="orange"
                        defaultChecked={status === EventStatus.DRAFT}
                        label={EventStatus.DRAFT}
                        name="status"
                        value={EventStatus.DRAFT}
                      />
                      <RadioItem
                        color="green"
                        defaultChecked={status === EventStatus.PUBLISHED}
                        label={EventStatus.PUBLISHED}
                        name="status"
                        value={EventStatus.PUBLISHED}
                      />
                      <RadioItem
                        color="gray"
                        defaultChecked={status === EventStatus.FINISHED}
                        label={EventStatus.FINISHED}
                        name="status"
                        value={EventStatus.FINISHED}
                      />
                      <RadioItem
                        color="red"
                        defaultChecked={status === EventStatus.CANCELED}
                        label={EventStatus.CANCELED}
                        name="status"
                        value={EventStatus.CANCELED}
                      />
                    </Container>
                  </Container>
                  <Container
                    sx={{
                      flexDirection: 'row',
                      display: 'flex',
                      mx: 'auto',
                      width: '95%',
                    }}
                  >
                    <Button
                      onClick={() => history.goBack()}
                      sx={{ bg: 'orange', marginRight: 'auto' }}
                      type="button"
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={() =>
                        ShowModal({
                          onSuccess: () => handleDelete(id),
                          type: ModalTypes.ConfirmDeleteModalValues,
                        })
                      }
                      sx={{ marginLeft: '20px' }}
                      type="button"
                      variant="red"
                    >
                      Delete
                    </Button>
                    <Button
                      sx={{ marginLeft: '20px' }}
                      type="submit"
                      variant="green"
                    >
                      Update
                    </Button>
                  </Container>
                </Container>
              </Container>
            </Form>
          )
        )}
      </Formik>
    </Fragment>
  )
}

export default UpdateEventForm
