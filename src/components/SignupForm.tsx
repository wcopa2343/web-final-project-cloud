/** @jsxRuntime classic */
/** @jsx jsx */

import { Form, Formik, FormikHelpers } from 'formik'
import { useEffect, useRef } from 'react'
import { Button, Flex, jsx, Text } from 'theme-ui'
import * as Yup from 'yup'

import '../styles/modal.css'
import TextInput from './common/TextInput'

export interface SignupFormValues {
  email: string
  password: string
  username: string
  passwordConfirm: string
}

interface SignUpProps {
  duplicatedUsername?: boolean
  duplicatedEmail?: boolean
  handleSubmit: (
    values: SignupFormValues,
    formikHelper: FormikHelpers<SignupFormValues>,
  ) => void
}

const SignUpForm = ({
  duplicatedUsername,
  duplicatedEmail,
  handleSubmit,
}: SignUpProps): JSX.Element => {
  const initialValues: SignupFormValues = {
    email: '',
    password: '',
    username: '',
    passwordConfirm: '',
  }

  const buttonRef = useRef<any>(null)
  let previousUsername: string | null | undefined = ''
  let previousEmail: string | null | undefined = ''

  useEffect(() => {
    if (duplicatedUsername || duplicatedEmail) buttonRef.current.click()
  })

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'The username cannot have less than 3 characters')
      .max(20, 'The username cannot have more than 20 characters')
      .required('Username field is required')
      .test('duplicatedUsername', 'This username is already taken', value => {
        if (previousUsername !== value) {
          if (duplicatedUsername) {
            previousUsername = value
            duplicatedUsername = false
            return false
          } else return true
        } else return false
      }),
    password: Yup.string()
      .min(3, 'The password must have more than 2 characters')
      .required('Password field is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm password field is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email field is required')
      .test('duplicatedEmail', 'This email is already taken', value => {
        if (previousEmail !== value) {
          if (duplicatedEmail) {
            previousEmail = value
            duplicatedEmail = false
            return false
          } else return true
        } else return false
      }),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignUpSchema}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text
            sx={{
              alignSelf: 'center',
              fontSize: '2em',
              fontWeight: 'bolder',
              marginBottom: '1rem',
            }}
            variant="Title"
          >
            Sign Up
          </Text>
          <TextInput
            name="username"
            id="username"
            label="Username"
            placeholder="Enter username"
            type="text"
          />
          <TextInput
            name="email"
            id="email"
            label="Email"
            placeholder="Enter email"
            type="email"
          />
          <TextInput
            name="password"
            id="password"
            label="Password"
            placeholder="Enter password"
            type="password"
          />
          <TextInput
            name="passwordConfirm"
            id="passwordConfirm"
            label="Confirm Password"
            placeholder="Enter password again"
            type="password"
          />
          <Flex
            sx={{
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <Button
              ref={buttonRef}
              disabled={isSubmitting}
              type="submit"
              variant="green"
            >
              Sign Up
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
