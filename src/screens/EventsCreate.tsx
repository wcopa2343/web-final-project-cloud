import dayjs from 'dayjs'
import { FormikHelpers } from 'formik'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import CreateEventForm, { Values } from '../components/CreateEventForm'
import { selectAuthInfo } from '../redux/authSlice'
import { createEvent } from '../redux/eventsSlice'
import { CreateEvent } from '../redux/types'
import { createImageUrl } from '../utils/imageClient'

function EventsCreate(): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()
  const [image, setImage] = useState<File>()
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [imageError, setError] = useState<string | boolean>(false)
  const [isLinkVisible, setIsLinkVisible] = useState<boolean>(false)

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    if (image) {
      setLoading(true)
      const newImageUrl = await createImageUrl(image)
      if (newImageUrl) {
        const newEvent: CreateEvent = {
          ...values,
          category: category.join(','),
          endDate: dayjs(values.endDate).toISOString(),
          imageUrl: newImageUrl,
          isLinkVisible: isLinkVisible,
          startDate: dayjs(values.startDate).toISOString(),
          tags: tags.join(','),
        }
        await dispatch(createEvent(newEvent))
      }
      setLoading(false)
      history.push('/events/eventsManager')
    }
    setError('Upload some image please')
  }

  const authState = useSelector(selectAuthInfo)
  const token = authState.userInfo.token
  return (
    <Fragment>
      <CreateEventForm
        category={category}
        handleSubmit={handleSubmit}
        getCategory={(local: string[]) => setCategory(local)}
        getImage={(local: File) => setImage(local)}
        getTag={(local: string[]) => setTags(local)}
        isLinkVisible={isLinkVisible}
        imageError={imageError}
        loading={loading}
        setIsLinkVisible={setIsLinkVisible}
        tags={tags}
        token={token}
      />
    </Fragment>
  )
}

export default EventsCreate
