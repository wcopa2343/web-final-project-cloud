/** @jsxRuntime classic */
/** @jsx jsx */

import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, jsx, Text } from 'theme-ui'
import * as Yup from 'yup'

import { selectAuthInfo } from '../redux/authSlice'
import { UserInformation, UserInformationUpdateData } from '../redux/types'
import { modifyUserInformation } from '../redux/userSlice'
import '../styles/modal.css'
import { createImageUrl } from '../utils/imageClient'
import ImageUpload from './common/ImageUpload'
import TextInput from './common/TextInput'

const UserInformationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'The Name cannot have less than 3 characters')
    .max(50, 'The Name cannot have more than 50 characters')
    .required('The Name is required'),
  lastName: Yup.string()
    .min(3, 'The Last Name cannot have less than 3 characters')
    .max(50, 'The Last Name cannot have more than 50 characters')
    .required('The Last Name is required'),
  facebookUrlProfile: Yup.string().matches(
    /^(?:(?:http|https):\/\/)?www.facebook.com\/([\w]*)?/,
    'Incorrect format. Facebook profile should be: www.facebook.com/profile-name',
  ),
  linkedinUrlProfile: Yup.string().matches(
    /^(?:(?:http|https):\/\/)?www.linkedin.com\/([\w]*)?/,
    'Incorrect format. Linkedin profile should be: www.linkedin.com/profile-name',
  ),
  twitterUrlProfile: Yup.string().matches(
    /^(?:(?:http|https):\/\/)?twitter.com\/([\w]*)?/,
    'Incorrect format. Twitter profile should be: twitter.com/profile-name',
  ),
  youtubeUrlProfile: Yup.string().matches(
    /^(?:(?:http|https):\/\/)?www.youtube.com\/([\w]*)?/,
    'Incorrect format. Youtube profile should be: www.youtube.com/profile-name',
  ),
})

function AccountInformation({
  facebookUrlProfile,
  firstName,
  lastName,
  linkedinUrlProfile,
  pictureUrlProfile,
  twitterUrlProfile,
  userId,
  youtubeUrlProfile,
}: UserInformation): JSX.Element {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuthInfo)
  const token = auth.userInfo.token

  const [file, setFile] = useState<File>()

  const sendUserInformation = async (values: UserInformation) => {
    let image = values.pictureUrlProfile
    if (file != null) {
      image = await createImageUrl(file)
    }
    const updatedUserInformation: UserInformation = {
      facebookUrlProfile: values.facebookUrlProfile,
      firstName: values.firstName,
      lastName: values.lastName,
      linkedinUrlProfile: values.linkedinUrlProfile,
      pictureUrlProfile: image,
      twitterUrlProfile: values.twitterUrlProfile,
      userId: userId,
      youtubeUrlProfile: values.youtubeUrlProfile,
    }

    const userInformationToUpdate: UserInformationUpdateData = {
      body: updatedUserInformation,
      token: token,
      userId: updatedUserInformation.userId,
    }

    dispatch(modifyUserInformation(userInformationToUpdate))
  }
  const initialValues: UserInformation = {
    facebookUrlProfile: facebookUrlProfile,
    firstName: firstName,
    lastName: lastName,
    pictureUrlProfile: pictureUrlProfile,
    linkedinUrlProfile: linkedinUrlProfile,
    twitterUrlProfile: twitterUrlProfile,
    userId: userId,
    youtubeUrlProfile: youtubeUrlProfile,
  }

  return (
    <Container
      sx={{
        backgroundColor: 'lightGray',
        flexBasis: '33%',
        padding: '20px 50px',
        '@media screen and (max-width:425px)': {
          padding: '20px 30px',
        },
        '@media screen and (max-width:1024px)': {
          flexBasis: '50%',
        },
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          sendUserInformation(values)
          setSubmitting(false)
        }}
        validationSchema={UserInformationSchema}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <Container>
              <ImageUpload
                alt={pictureUrlProfile}
                fromChild={(local: File) => setFile(local)}
                size={20}
              />
              <Container
                sx={{
                  marginLeft: '45%',
                  marginTop: '-320px',
                  padding: 0,
                  width: 'auto',
                  '@media screen and (max-width:425px)': {
                    marginLeft: '-15px',
                    marginTop: '-160px',
                  },
                  '@media screen and (min-width:426px) and (max-width:768px)': {
                    marginLeft: '250px',
                    marginTop: '-370px',
                  },
                  '@media screen and (min-width:769px) and (max-width:1024px)': {
                    marginLeft: '55%',
                  },
                  '@media screen and (min-width:1025px)': {
                    marginLeft: '55%',
                    marginTop: '-310px',
                  },
                }}
              >
                <TextInput
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  placeholder="Enter First Name"
                  type="text"
                />
                <TextInput
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter Last Name"
                  type="text"
                />
              </Container>
            </Container>

            <Text
              sx={{
                color: 'gray',
                textAlign: 'center',
                '@media screen and (min-width:426px) and (max-width:768px)': {
                  marginTop: '25px',
                  textAlign: 'left',
                },
                '@media screen and (min-width:769px) and (max-width:1024px)': {
                  marginTop: '0px',
                },
              }}
              variant="title_4"
            >
              Social Accounts
            </Text>
            <TextInput
              id="facebookUrlProfile"
              label="Facebook Profile"
              name="facebookUrlProfile"
              placeholder="Enter Facebook Profile URL"
              type="text"
            />
            <TextInput
              id="linkedinUrlProfile"
              label="LinkedIn Profile"
              name="linkedinUrlProfile"
              placeholder="Enter LinkedIn Profile URL"
              type="text"
            />
            <TextInput
              id="twitterUrlProfile"
              label="Twitter Profile"
              name="twitterUrlProfile"
              placeholder="Enter Twitter Profile URL"
              type="text"
            />
            <TextInput
              id="youtubeUrlProfile"
              label="YouTube Profile"
              name="youtubeUrlProfile"
              placeholder="Enter YouTube Profile URL"
              type="text"
            />
            <Button sx={{ marginTop: '20px' }} type="submit" variant="green">
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default AccountInformation
