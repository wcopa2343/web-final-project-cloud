import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import Notifications from '../components/Notifications'
import Notification from '../components/Notification'
import store from '../redux/store'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('Notifications Tests', () => {
  it('Render Notifications', () => {
    render(
      <Provider store={store}>
        <Notifications />
      </Provider>,
    )
  })
  it('Render Notification', () => {
    render(
      <Provider store={store}>
        <Notification />
      </Provider>,
    )
  })
})
