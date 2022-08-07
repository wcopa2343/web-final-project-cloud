import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import EventsUpdate from '../screens/EventsUpdate'
import NotFound from '../screens/NotFound'
import store from '../redux/store'

test('Event Update is rendering', () => {
  render(
    <Provider store={store}>
      <EventsUpdate required={true} match={{ params: { id: 1 } }} />
    </Provider>,
  )
})

test('Page Not found is rendering', () => {
  render(
    <Provider store={store}>
      <NotFound />
    </Provider>,
  )
})
