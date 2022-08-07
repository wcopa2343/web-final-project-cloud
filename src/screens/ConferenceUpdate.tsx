import { FormikHelpers } from 'formik'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { Text } from 'theme-ui'
import showModal from '../components/common/CustomModal'

import PageSpinner from '../components/common/PageSpinner'
import UpdateConferenceForm, {
  UpdateValues,
} from '../components/UpdateConferenceForm'
import { selectAuthInfo } from '../redux/authSlice'
import {
  fetchConferencesById,
  singleConference,
} from '../redux/conferenceSlice'
import { updateExistingConference } from '../redux/conferencesSlice'
import { ModalTypes, Status } from '../redux/types'

function ConferenceUpdate({
  match,
}: RouteComponentProps<{ id: string }>): JSX.Element {
  const IMAGE_ERROR = 'Drag some image please'

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

  const { conference, status } = useSelector(singleConference)

  const ConfirmConference = (values: UpdateValues) => {
    dispatch(
      updateExistingConference({
        banner,
        bannerUrl,
        conferenceId,
        createdBy,
        image,
        imageUrl,
        logo,
        logoUrl,
        token,
        values,
      }),
    )
    history.push('/conferences/conferenceManager')
  }

  const conferenceId = conference.id
  const createdBy = conference.createdBy
  const imageUrl = conference.imageUrl
  const bannerUrl = conference.bannerUrl
  const logoUrl = conference.logoUrl
  const handleSubmit = async (
    values: UpdateValues,
    { setSubmitting }: FormikHelpers<UpdateValues>,
  ) => {
    showModal({
      onSuccess: () => ConfirmConference(values),
      type: ModalTypes.ConfirmUpdateModalValues,
    })
    setLoading(true)
    setLoading(false)
    setSubmitting(false)
    setBannerError(IMAGE_ERROR)
    setImageError(IMAGE_ERROR)
    setLogoError(IMAGE_ERROR)
  }

  useEffect(() => {
    dispatch(fetchConferencesById(match.params.id))
  }, [dispatch, match.params.id])

  return (
    <Fragment>
      {status === Status.IDLE ? (
        <div></div>
      ) : status === Status.LOADING ? (
        <PageSpinner />
      ) : status === Status.FAILED ? (
        <Text>Failure Fetching Data</Text>
      ) : (
        <UpdateConferenceForm
          bannerError={bannerError}
          bannerUrl={bannerUrl}
          createdBy={createdBy}
          conference={conference}
          getBanner={(local: File) => setBanner(local)}
          getImage={(local: File) => setImage(local)}
          getLogo={(local: File) => setLogo(local)}
          handleSubmit={handleSubmit}
          imageError={imageError}
          imageUrl={imageUrl}
          loading={loading}
          logoError={logoError}
          logoUrl={logoUrl}
        />
      )}
    </Fragment>
  )
}

export default ConferenceUpdate
