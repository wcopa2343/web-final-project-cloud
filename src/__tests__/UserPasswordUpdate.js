import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import PasswordUpdate from '../components/PasswordUpdate'
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

describe('User Password Update Tests', () => {
  it('Render Form', () => {
    render(
      <Provider store={store}>
        <PasswordUpdate />
      </Provider>,
    )
  })
})
