import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import CircleCounter from '../components/common/CircleCounter'
import store from '../redux/store'

test('CircleCounter is rendering', () => {
  render(
    <Provider store={store}>
      <CircleCounter />
    </Provider>,
  )
})
