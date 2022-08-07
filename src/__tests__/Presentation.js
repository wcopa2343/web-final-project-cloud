import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import Presentation from '../components/Presentation'
import store from '../redux/store'

test('Presentation component is rendering', () => {
  render(
    <Provider store={store}>
      <Presentation />
    </Provider>,
  )
})
