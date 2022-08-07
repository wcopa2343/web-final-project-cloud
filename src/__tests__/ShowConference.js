import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import ShowConference from '../components/ShowConference'
import store from '../redux/store'

test('Show Conference is rendering', () => {
  render(
    <Provider store={store}>
      <ShowConference />
    </Provider>,
  )
})
