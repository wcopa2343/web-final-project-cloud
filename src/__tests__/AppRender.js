import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import App from '../App.tsx'
import store from '../redux/store'

test('Main App is rendering', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
})
