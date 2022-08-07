import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import store from '../redux/store'
import EventsDetail from '../screens/EventsDetail'

const matchDummy = {
  params: {
    id: 1,
  },
}

describe('Displaying Events Create ', () => {
  test('Rendering Events Create', () => {
    window.innerWidth = 500
    render(
      <Provider store={store}>
        <EventsDetail match={matchDummy} />
      </Provider>,
    )
  })
})
