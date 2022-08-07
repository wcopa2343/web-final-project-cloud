import dayjs from 'dayjs'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Box, Container, Label, Text } from 'theme-ui'
import * as Yup from 'yup'

import ChipInput from './common/ChipInput'
import ImageUpload from './common/ImageUpload'
import PageSpinner from './common/PageSpinner'
import TextAreaInput from './common/TextAreaInput'
import TextInput from './common/TextInput'
import TextMessage from './common/TextMessage'
import ToggleSwitch from './common/ToggleSwitch'

const CreateEventSchema = Yup.object().shape({
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

export interface Values {
  capacity: number
  category: string
  conferenceId?: string
  createdBy?: number
  description: string
  endDate: string
  isLinkVisible: boolean
  meetingLink: string
  name: string
  speaker: string
  startDate: string
  summary: string
  tags: string
  token?: string
}

export interface FormProps {
  category: string[]
  getCategory: (local: string[]) => void
  getImage: (local: File) => void
  getTag: (local: string[]) => void
  handleSubmit: (values: Values, formikHelper: FormikHelpers<Values>) => void
  imageError: string | boolean
  isLinkVisible: boolean
  loading: boolean
  setIsLinkVisible: (value: boolean) => void
  tags: string[]
  token?: string
}

function CreateEventForm({
  category,
  getCategory,
  getImage,
  getTag,
  handleSubmit,
  imageError,
  isLinkVisible,
  loading,
  setIsLinkVisible,
  tags,
  token,
}: FormProps): JSX.Element {
  const today = dayjs(new Date()).format('YYYY-MM-DDTHH:mm')
  const initialValues: Values = {
    capacity: 0,
    category: '',
    description: '',
    endDate: today,
    isLinkVisible: isLinkVisible,
    meetingLink: '',
    name: '',
    speaker: '',
    startDate: today,
    summary: '',
    tags: '',
    token: token,
  }
  const history = useHistory()

  const removeTag = (indexToRemove: number) => {
    getTag([...tags.filter((_, index) => index !== indexToRemove)])
  }
  const addTag = (newTags: string[]) => {
    getTag([...tags, ...newTags])
  }
  const removeCategory = (indexToRemove: number) => {
    getCategory([...category.filter((_, index) => index !== indexToRemove)])
  }
  const addCategory = (newCategories: string[]) => {
    getCategory([...category, ...newCategories])
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateEventSchema}
      onSubmit={handleSubmit}
    >
      {loading ? (
        <PageSpinner />
      ) : (
        ({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ImageUpload
              fromChild={(local: File) => getImage(local)}
              alt={''}
            />
            {imageError && (
              <TextMessage
                sx={{ fontSize: '25px', marginLeft: '50px' }}
                type="error"
              >
                {imageError}
              </TextMessage>
            )}
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
                  sx={{
                    minHeight: '60vh',
                    maxHeight: '65vh',
                  }}
                  name="description"
                  label=""
                  placeholder="Description of the event"
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
                  sx={{
                    fontSize: '28px',
                    marginBottom: '10px',
                    mx: 'auto',
                    width: '95%',
                  }}
                  label=""
                  name="name"
                  placeholder="Name of the event"
                  type="text"
                />
                <Container sx={{ backgroundColor: 'lightGray' }}>
                  <TextInput
                    data-testid="startDate"
                    label="Start date"
                    name="startDate"
                    sx={{ fontSize: '18px' }}
                    type="datetime-local"
                  />
                  <TextInput
                    data-testid="endDate"
                    label="End date"
                    name="endDate"
                    sx={{ fontSize: '18px' }}
                    type="datetime-local"
                  />
                  <TextAreaInput
                    sx={{
                      fontSize: '16px',
                      my: 0,
                      p: '5px',
                    }}
                    name="summary"
                    label="Summary"
                    placeholder="Summary"
                    type="text"
                  />
                  <TextInput
                    name="speaker"
                    label="Speaker"
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
                      isToggled={isLinkVisible}
                      onToggle={() => {
                        setIsLinkVisible(!isLinkVisible)
                      }}
                    />
                  </Box>
                  <ChipInput
                    chips={tags}
                    label="Tags"
                    max={10}
                    name="tags"
                    addChip={addTag}
                    removeChip={removeTag}
                    placeholder="Tags"
                    type="text"
                  />
                  <ChipInput
                    addChip={addCategory}
                    chips={category}
                    label="Categories"
                    max={10}
                    name="category"
                    placeholder="Categories"
                    removeChip={removeCategory}
                    type="text"
                  />
                  <TextInput
                    data-testid="capacity"
                    name="capacity"
                    label="Capacity"
                    placeholder="Capacity"
                    type="number"
                  />
                </Container>
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Button
                    onClick={() => history.push('/events/eventsManager')}
                    sx={{ marginLeft: 'auto' }}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ marginLeft: '8px' }}
                    type="submit"
                    variant="green"
                  >
                    Create
                  </Button>
                </Container>
              </Container>
            </Container>
          </Form>
        )
      )}
    </Formik>
  )
}

export default CreateEventForm
