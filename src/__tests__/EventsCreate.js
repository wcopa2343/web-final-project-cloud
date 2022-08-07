import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux/store'
import EventsCreate from '../screens/EventsCreate'

describe('Displaying Events Create ', () => {
  test('Rendering Events Create', () => {
    window.innerWidth = 500
    render(
      <Provider store={store}>
        <EventsCreate />
      </Provider>,
    )
  })
})
