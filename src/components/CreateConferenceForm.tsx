import dayjs from 'dayjs'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { Button, Container } from 'theme-ui'
import * as Yup from 'yup'

import ImageUpload from './common/ImageUpload'
import PageSpinner from './common/PageSpinner'
import TextAreaInput from './common/TextAreaInput'
import TextInput from './common/TextInput'
import TextMessage from './common/TextMessage'

const CreateConferenceSchema = Yup.object().shape({
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

export interface Values {
  conferenceName: string
  description: string
  endDate: string
  startDate: string
}

export interface formProps {
  bannerError: string | boolean
  handleSubmit: (values: Values, formikHelper: FormikHelpers<Values>) => void
  getBanner: (local: File) => void
  getImage: (local: File) => void
  getLogo: (local: File) => void
  imageError: string | boolean
  logoError: string | boolean
  loading: boolean
}

function CreateConferenceForm({
  bannerError,
  getBanner,
  getImage,
  getLogo,
  handleSubmit,
  imageError,
  loading,
  logoError,
}: formProps): JSX.Element {
  const today = dayjs(new Date()).format('YYYY-MM-DDTHH:mm')

  const initialValues: Values = {
    conferenceName: '',
    description: '',
    endDate: today,
    startDate: today,
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CreateConferenceSchema}
    >
      {loading ? (
        <PageSpinner />
      ) : (
        ({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <ImageUpload
              fromChild={(local: File) => getBanner(local)}
              alt={''}
            />
            {bannerError && (
              <TextMessage
                sx={{ fontSize: '25px', marginLeft: '50px' }}
                type="error"
              >
                {bannerError}
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
                      }}
                      fromChild={(local: File) => getImage(local)}
                      alt={''}
                    />
                    {imageError && (
                      <TextMessage
                        sx={{ fontSize: '20px', mx: 'auto' }}
                        type="error"
                      >
                        {bannerError}
                      </TextMessage>
                    )}
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
                      }}
                      fromChild={(local: File) => getLogo(local)}
                      alt={''}
                    />
                    {logoError && (
                      <TextMessage
                        sx={{ fontSize: '20px', mx: 'auto' }}
                        type="error"
                      >
                        {bannerError}
                      </TextMessage>
                    )}
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
                <Button
                  disabled={isSubmitting}
                  sx={{ mt: '20px', ml: 'auto' }}
                  type="submit"
                  variant="green"
                >
                  Create
                </Button>
              </Container>
            </Container>
          </Form>
        )
      )}
    </Formik>
  )
}

export default CreateConferenceForm
