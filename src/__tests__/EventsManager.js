import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux/store'
import EventsManager from '../screens/EventsManager'

test(' EventsManager is rendering', () => {
  render(
    <Provider store={store}>
      <EventsManager />
    </Provider>,
  )
})
