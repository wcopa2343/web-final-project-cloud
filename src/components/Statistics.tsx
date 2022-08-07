import React, { useEffect } from 'react'
import { FaCalendarCheck, FaCertificate, FaUserGraduate } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Container, Donut, Flex, Text } from 'theme-ui'

import {
  eventStatistics,
  fetchAllEventsCount,
} from '../redux/eventStatisticsSlice'
import { Status } from '../redux/types'
import PageSpinner from './common/PageSpinner'

const ICON_SIZE = 200

const Statistics = (): JSX.Element => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllEventsCount())
  }, [dispatch])

  const { generalEventStatistics, status } = useSelector(eventStatistics)

  if (status === Status.IDLE) {
    return <Box />
  }
  if (status === Status.LOADING) {
    return <PageSpinner />
  }
  if (status === Status.FAILED) {
    return <Box>Failure Fetching Data</Box>
  }
  return (
    <div></div>
  )
}
export default Statistics
