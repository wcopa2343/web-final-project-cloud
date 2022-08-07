import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from 'theme-ui'
import * as Yup from 'yup'

import { selectAuthInfo } from '../redux/authSlice'
import { singleEvent } from '../redux/eventSlice'
import { createRegistration } from '../redux/registrationSlice'
import { CreateRegistration, ModalTypes } from '../redux/types'
import ShowModal from './common/CustomModal'

const CreateEventSchema = Yup.object().shape({
  userId: Yup.number().required('Required'),
})
interface RegistrationButtonProps {
  eventIsFull: boolean
}

function RegistrationButton({
  eventIsFull,
}: RegistrationButtonProps): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
  const { event } = useSelector(singleEvent)
  const authState = useSelector(selectAuthInfo)
  const token = authState.userInfo.token
  const userId = authState.userInfo.userId ?? 0
  const initialValues: CreateRegistration = {
    userId,
  }
  const handleSubmit = async (
    values: CreateRegistration,
    { setSubmitting }: FormikHelpers<CreateRegistration>,
  ) => {
    if (userId != 0) {
      if (eventIsFull) {
        ShowModal({
          onSuccess: () => history.push(`/events/detail/${event.id}`),
          type: ModalTypes.EventIsFullModalValues,
        })
      } else {
        dispatch(createRegistration({ eventId: event.id, body: values, token }))
      }
      setSubmitting(false)
    } else {
      localStorage.setItem('prevLocation', history.location.pathname)
      history.push('/sign-in')
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CreateEventSchema}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Button disabled={isSubmitting} type="submit" variant="green">
            Join
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default RegistrationButton
