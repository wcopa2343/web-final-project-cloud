import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import ConferenceCalendar from '../screens/ConferenceCalendar'
import ConferenceCreate from '../screens/ConferenceCreate'
import ConferenceDetail from '../screens/ConferenceDetail'
import ConferenceList from '../screens/ConferenceList'
import ConferenceUpdate from '../screens/ConferenceUpdate'
import store from '../redux/store'

test('Conference create is rendering', () => {
  render(
    <Provider store={store}>
      <ConferenceCreate />
    </Provider>,
  )
})

test('Conference detail is rendering', () => {
  render(
    <Provider store={store}>
      <ConferenceDetail required={true} match={{ params: { id: 1 } }} />
    </Provider>,
  )
})

test('Conference list is rendering', () => {
  render(
    <Provider store={store}>
      <ConferenceList />
    </Provider>,
  )
})

test('Conference update is rendering', () => {
  render(
    <Provider store={store}>
      <ConferenceUpdate required={true} match={{ params: { id: 1 } }} />
    </Provider>,
  )
})

test('Conference Calendar is rendering', () => {
  render(
    <Provider store={store}>
      <ConferenceCalendar required={true} match={{ params: { id: 1 } }} />
    </Provider>,
  )
})
