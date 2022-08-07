import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import ConferenceController from '../components/ConferenceController'
import ConferenceControl from '../screens/ConferenceControl'
import ConferenceManager from '../screens/ConferenceManager'
import store from '../redux/store'
import Router from '../components/Router'
import { BrowserRouter } from 'react-router-dom'
import ManagerFragment from '../components/common/ManagerFragment'
import mockEventData from '../test/mock-data'

const dummyConference = {
  bannerUrl: 'string',
  conferenceName: 'string',
  description: 'string',
  endDate: 'string',
  eventsId: 'string',
  id: 'string',
  imageUrl: 'string',
  logoUrl: 'string',
  startDate: 'string',
  status: 'EventStatus',
}

test('Conference control is rendering', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ConferenceControl required={true} match={{ params: { id: 1 } }} />
      </BrowserRouter>
    </Provider>,
  )
})

test('Conference Manager is rendering', () => {
  render(
    <Provider store={store}>
      <ConferenceManager />
    </Provider>,
  )
})

test('Conference controller is rendering', () => {
  render(
    <Provider store={store}>
      <ConferenceController conference={dummyConference} />
    </Provider>,
  )
})
test('Manager Fragment is rendering', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ManagerFragment
          endDate=""
          id=""
          imageUrl=""
          name=""
          speaker=""
          startDate=""
          summary=""
          tags=""
        />
      </BrowserRouter>
    </Provider>,
  )
})
