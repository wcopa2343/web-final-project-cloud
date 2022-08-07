/** @jsxRuntime classic */
/** @jsx  jsx */

import { useEffect } from 'react'
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Flex, Grid, Image, jsx, Text } from 'theme-ui'

import { fetchById, singleUserInfo } from '../../redux/userSlice'

interface props {
  userId: number
}

function OrganizerCard({ userId }: props): JSX.Element {
  const dispatch = useDispatch()
  const { userinformation } = useSelector(singleUserInfo)
  const {
    facebookUrlProfile,
    linkedinUrlProfile,
    twitterUrlProfile,
    youtubeUrlProfile,
  } = userinformation

  useEffect(() => {
    const createdBy = userId
    dispatch(fetchById(createdBy))
  }, [dispatch, userId])

  const logostyles = {
    cursor: 'pointer',
    height: '55px',
    ml: '10px',
    width: '55px',
  }

  const disable = {
    ...logostyles,
    opacity: '0.3',
  }

  function redirectTo(page: string) {
    switch (page) {
      case 'facebook':
        if (facebookUrlProfile) window.location.href = facebookUrlProfile
        break
      case 'twitter':
        if (twitterUrlProfile) window.location.href = twitterUrlProfile
        break
      case 'linkedin':
        if (linkedinUrlProfile) window.location.href = linkedinUrlProfile
        break
      case 'youtube':
        if (youtubeUrlProfile) window.location.href = youtubeUrlProfile
        break
    }
  }

  return (
    <div></div>
  )
}

export default OrganizerCard
