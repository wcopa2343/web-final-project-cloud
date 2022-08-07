import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import EmptyPage from '../components/common/EmptyPage'
import store from '../redux/store'

test('Empty page is rendering', () => {
  render(
    <Provider store={store}>
      <EmptyPage />
    </Provider>,
  )
})
