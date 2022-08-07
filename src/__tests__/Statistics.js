import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import Statistics from '../components/Statistics'
import store from '../redux/store'

test('Statistics component is rendering', () => {
  render(
    <Provider store={store}>
      <Statistics />
    </Provider>,
  )
})
