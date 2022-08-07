import { Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'theme-ui'
import * as Yup from 'yup'

import { selectAuthInfo } from '../redux/authSlice'
import { singleEvent } from '../redux/eventSlice'
import { removeRegistration } from '../redux/registrationSlice'
import { CreateRegistration as FormValues } from '../redux/types'

const RemoveEventSchema = Yup.object().shape({})

function LeaveEventButton(): JSX.Element {
  const dispatch = useDispatch()
  const { event } = useSelector(singleEvent)
  const authState = useSelector(selectAuthInfo)
  const token = authState.userInfo.token
  const userId = authState.userInfo.userId
  const initialValues: FormValues = {
    userId,
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          removeRegistration({
            eventId: event.id,
            userId: values.userId,
            token,
          }),
        )
        setSubmitting(false)
      }}
      validationSchema={RemoveEventSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Button disabled={isSubmitting} type="submit" variant="red">
            Leave
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LeaveEventButton
