import { FormikHelpers } from 'formik'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CreateConferenceForm, {
  Values,
} from '../components/CreateConferenceForm'
import { selectAuthInfo } from '../redux/authSlice'
import { createNewConference } from '../redux/conferencesSlice'

function ConferenceCreate(): JSX.Element {
  const dispatch = useDispatch()
  const history = useHistory()

  const authState = useSelector(selectAuthInfo)
  const token = authState.userInfo.token

  const [banner, setBanner] = useState<File>()
  const [image, setImage] = useState<File>()
  const [logo, setLogo] = useState<File>()

  const [bannerError, setBannerError] = useState<string | boolean>(false)
  const [imageError, setImageError] = useState<string | boolean>(false)
  const [logoError, setLogoError] = useState<string | boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    if (banner && image && logo) {
      setLoading(true)
      await dispatch(
        createNewConference({
          banner,
          image,
          logo,
          values,
          token,
        }),
      )
      setLoading(false)
      history.push('/conferences/conferenceManager')
      setSubmitting(false)
    }
    setBannerError('Drag some image please')
    setImageError('Drag some image please')
    setLogoError('Drag some image please')
  }

  return (
    <Fragment>
      <CreateConferenceForm
        bannerError={bannerError}
        getBanner={(local: File) => setBanner(local)}
        getImage={(local: File) => setImage(local)}
        getLogo={(local: File) => setLogo(local)}
        handleSubmit={handleSubmit}
        imageError={imageError}
        logoError={logoError}
        loading={loading}
      />
    </Fragment>
  )
}

export default ConferenceCreate
