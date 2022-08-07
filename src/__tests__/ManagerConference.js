import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import ConferenceDisplay from '../components/common/ConferenceDisplay'
import ConferenceManager from '../screens/ConferenceManager'
import store from '../redux/store'
import { BrowserRouter } from 'react-router-dom'

test('Conference Display is rendering', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ConferenceDisplay />
      </Provider>
    </BrowserRouter>,
  )
})

test('Conference Manager is rendering', () => {
  render(
    <Provider store={store}>
      <ConferenceManager />
    </Provider>,
  )
})
