import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from '../redux/store'
import AddConferenceEvents from '../screens/AddConferenceEvents'

describe('Rendering AddConferenceEvents', () => {
  test(' AddConferenceEvents is rendering', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddConferenceEvents />
        </BrowserRouter>
      </Provider>,
    )
  })
})
