import dayjs from 'dayjs'
import { Form, Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container } from 'theme-ui'
import * as Yup from 'yup'

import { Conference, EventStatus } from '../redux/types'
import ImageUpload from './common/ImageUpload'
import PageSpinner from './common/PageSpinner'
import RadioItem from './common/RadioItem'
import TextAreaInput from './common/TextAreaInput'
import TextInput from './common/TextInput'

const UpdateConferenceSchema = Yup.object().shape({
  conferenceName: Yup.string()
    .min(5, 'The name cannot have less than 5 characters')
    .max(50, 'The name cannot have more than 50 characters')
    .required('Name field is required'),
  description: Yup.string()
    .min(25, 'The description cannot have less than 25 characters')
    .max(1500, 'The description cannot have more than 1500 characters')
    .required('Description field is required'),
  endDate: Yup.date()
    .required('End date field is required')
    .min(Yup.ref('startDate'), 'The end date cannot be before the start date'),
  startDate: Yup.date().required('Start date field is required'),
})

export interface UpdateValues {
  conferenceName: string
  description: string
  endDate: string
  eventsId: string[]
  startDate: string
  status: EventStatus
}

export interface FormProps {
  bannerError: string | boolean
  conference: Conference
  getBanner: (local: File) => void
  getImage: (local: File) => void
  getLogo: (local: File) => void
  handleSubmit: (
    values: UpdateValues,
    formikHelper: FormikHelpers<UpdateValues>,
  ) => void
  imageError: string | boolean
  loading: boolean
  logoError: string | boolean
  imageUrl: string
  logoUrl: string
  bannerUrl: string
  createdBy: number
}

function UpdateConferenceForm({
  bannerError,
  bannerUrl,
  conference,
  createdBy,
  getBanner,
  getImage,
  getLogo,
  handleSubmit,
  imageError,
  imageUrl,
  loading,
  logoError,
  logoUrl,
}: FormProps): JSX.Element {
  const history = useHistory()
  const [newConference, setNewConference] = useState<Conference>({
    ...conference,
  })

  const initialValues: UpdateValues = {
    conferenceName: newConference.conferenceName,
    description: newConference.description,
    endDate: dayjs(new Date(newConference.endDate)).format('YYYY-MM-DDTHH:mm'),
    eventsId: newConference.eventsId,
    startDate: dayjs(new Date(newConference.startDate)).format(
      'YYYY-MM-DDTHH:mm',
    ),
    status: newConference.status,
  }
  if (loading) {
    return <PageSpinner />
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikHelper) => {
        const conferenceHelper: Conference = {
          ...values,
          bannerUrl,
          createdBy,
          imageUrl,
          logoUrl,
        }
        setNewConference(conferenceHelper)
        handleSubmit(values, formikHelper)
      }}
      validationSchema={UpdateConferenceSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <ImageUpload
            alt={conference.bannerUrl}
            fromChild={(local: File) => getBanner(local)}
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
            <Container
              sx={{
                maxWidth: '1200px',
                minWidth: '50vw',
              }}
            >
              <TextInput
                sx={{
                  fontSize: '28px',
                  marginBottom: '10px',
                  ml: '20px',
                  width: '70%',
                }}
                label=""
                name="conferenceName"
                placeholder="Name of the conference"
                type="text"
              />
              <TextAreaInput
                sx={{
                  minHeight: '65vh',
                  maxHeight: '70vh',
                }}
                name="description"
                label=""
                placeholder="Description of the conference"
                type="text"
              />
            </Container>
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
              variant="noMargin"
            >
              <Container
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                variant="noMargin"
              >
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '45vh',
                  }}
                  variant="noMargin"
                >
                  <ImageUpload
                    sx={{
                      border: '1px solid gray',
                      borderRadius: '50vh',
                      height: '45vh',
                      width: '45vh',
                      zIndex: 3,
                    }}
                    fromChild={(local: File) => getImage(local)}
                    alt={conference.imageUrl}
                  />
                </Container>
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '25vh',
                  }}
                  variant="noMargin"
                >
                  <ImageUpload
                    sx={{
                      border: '1px solid gray',
                      borderRadius: '50px',
                      height: '25vh',
                      width: '25vh',
                      zIndex: 3,
                    }}
                    fromChild={(local: File) => getLogo(local)}
                    alt={conference.logoUrl}
                  />
                </Container>
              </Container>
              <TextInput
                label="Start date"
                name="startDate"
                sx={{ fontSize: '18px' }}
                type="datetime-local"
              />
              <TextInput
                label="End date"
                name="endDate"
                sx={{ fontSize: '18px' }}
                type="datetime-local"
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
                  defaultChecked={conference.status === EventStatus.DRAFT}
                  label={EventStatus.DRAFT}
                  name="status"
                  value={EventStatus.DRAFT}
                />
                <RadioItem
                  color="green"
                  defaultChecked={conference.status === EventStatus.PUBLISHED}
                  label={EventStatus.PUBLISHED}
                  name="status"
                  value={EventStatus.PUBLISHED}
                />
                <RadioItem
                  color="gray"
                  defaultChecked={conference.status === EventStatus.FINISHED}
                  label={EventStatus.FINISHED}
                  name="status"
                  value={EventStatus.FINISHED}
                />
                <RadioItem
                  color="red"
                  defaultChecked={conference.status === EventStatus.CANCELED}
                  label={EventStatus.CANCELED}
                  name="status"
                  value={EventStatus.CANCELED}
                />
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
                  onClick={() => history.push('/conferences/conferenceManager')}
                  sx={{ bg: 'orange', mt: '20px', marginRight: 'auto' }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isSubmitting}
                  sx={{ mt: '20px', ml: 'auto' }}
                  type="submit"
                  variant="green"
                >
                  Update
                </Button>
              </Container>
            </Container>
          </Container>
        </Form>
      )}
    </Formik>
  )
}

export default UpdateConferenceForm
