import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from '../redux/store'
import { ConferenceEventsManager } from '../screens'

test(' ConferenceEventsManager is rendering', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ConferenceEventsManager
          match={{ params: { id: '' }, isExact: true, path: '', url: '' }}
        />
      </BrowserRouter>
    </Provider>,
  )
})
