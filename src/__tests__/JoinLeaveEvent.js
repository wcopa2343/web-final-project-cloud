import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import JoinEventButton from '../components/JoinEventButton'
import LeaveEventButton from '../components/LeaveEventButton'
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

describe('Join Button Tests', () => {
  it('Render Join Button', () => {
    render(
      <Provider store={store}>
        <JoinEventButton />
      </Provider>,
    )
  })
})

describe('Leave Button Tests', () => {
  it('Render Leave Button', () => {
    render(
      <Provider store={store}>
        <LeaveEventButton />
      </Provider>,
    )
  })
})
