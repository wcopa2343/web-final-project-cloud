/** @jsxRuntime classic */
/** @jsx jsx */

import { Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, jsx, Text } from 'theme-ui'
import * as Yup from 'yup'

import { selectAuthInfo } from '../redux/authSlice'
import { UserFields } from '../redux/types'
import { modifyUserPassword, singleUserInfo } from '../redux/userSlice'
import TextInput from './common/TextInput'

const UserPasswordUpdateSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Password cannot have less than 3 characters')
    .required('Current password field is required'),
  newPassword: Yup.string()
    .min(3, 'Password cannot have less than 3 characters')
    .required('New password field is required'),
  confirmPassword: Yup.string()
    .min(3, 'Password cannot have less than 3 characters')
    .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Repeat password field is required'),
})

interface userProps {
  email: string
  username: string
}

function PasswordUpdate({ email, username }: userProps): JSX.Element {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuthInfo)
  const { statusCode, error } = useSelector(singleUserInfo)
  const token: string | undefined = auth.userInfo.token
  const userId: number | undefined = auth.userInfo.userId

  interface FormValues {
    confirmPassword: string
    currentPassword: string
    email: string
    newPassword: string
    username: string
  }

  const sendUserInformation = async (values: FormValues) => {
    if (token && userId)
      dispatch(
        modifyUserPassword({
          body: {
            field: UserFields.PASSWORD,
            password: values.currentPassword,
            value: values.newPassword,
          },
          token,
          userId,
        }),
      )
  }

  const initialValues: FormValues = {
    confirmPassword: '',
    currentPassword: '',
    email,
    newPassword: '',
    username,
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
        validationSchema={UserPasswordUpdateSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          sendUserInformation(values)
          resetForm()
          setSubmitting(false)
        }}
      >
        {formik => (
          <Form onSubmit={formik.handleSubmit}>
            <Text variant="title_4" sx={{ color: 'gray' }}>
              Account Information
            </Text>
            <TextInput
              disabled
              id="username"
              label="Username"
              name="username"
              type="text"
            />
            <TextInput
              disabled
              id="email"
              label="Email"
              name="email"
              type="email"
            />
            <TextInput
              id="currentPassword"
              label="Current Password"
              name="currentPassword"
              placeholder="Enter Current Password"
              type="password"
            />
            <TextInput
              id="newPassword"
              label="New Password"
              name="newPassword"
              placeholder="Enter New Password"
              type="password"
            />
            <TextInput
              id="confirmPassword"
              label="Repeat Password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              type="password"
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

export default PasswordUpdate
