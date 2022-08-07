/** @jsxRuntime classic */
/** @jsx jsx */

import { Form, Formik, FormikHelpers } from 'formik'
import { Button, Flex, jsx, Text } from 'theme-ui'
import * as Yup from 'yup'

import { UserAccessInfo } from '../redux/types'
import '../styles/modal.css'
import TextInput from './common/TextInput'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'The username cannot have less than 3 characters')
    .max(20, 'The username cannot have more than 20 characters')
    .required('Username field is required'),
  password: Yup.string()
    .min(3, 'The password must have more than 2 characters')
    .required('Password field is required'),
})

export interface FormProps {
  handleSubmit: (
    values: UserAccessInfo,
    formikHelper: FormikHelpers<UserAccessInfo>,
  ) => void
}

const LoginForm = ({ handleSubmit }: FormProps): JSX.Element => {
  const initialValues: UserAccessInfo = { username: '', password: '' }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
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
            Sign In
          </Text>
          <TextInput
            name="username"
            id="username"
            label="Username"
            placeholder="Enter username"
            type="text"
          />
          <TextInput
            name="password"
            id="password"
            label="Password"
            placeholder="Enter password"
            type="password"
          />
          <Flex
            sx={{
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <Button type="submit" disabled={isSubmitting} variant="green">
              Sign In
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
