import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux/store'
import { EventsContainer } from '../screens'
import EventsList from '../screens/EventsList'

describe('Displaying the events list', () => {
  test('Rendering the events list', () => {
    render(
      <Provider store={store}>
        <EventsList />
      </Provider>,
    )
  })

  test('Rendering the external events container', () => {
    render(
      <Provider store={store}>
        <EventsContainer />
      </Provider>,
    )
  })
})
