/** @jsxRuntime classic */
/** @jsx jsx */

import { Fragment } from 'react'
import { jsx } from 'theme-ui'

import Search from '../components/Search'
import EventsList from './EventsList'

const EventsContainer = (): JSX.Element => (
  <Fragment>
    <Search />
    <EventsList />
  </Fragment>
)

export default EventsContainer
