import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import RegisteredCounter from '../components/RegisteredCounter'
import store from '../redux/store'

let container
const count = 0
const capacity = 10

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('Registered Counter Tests', () => {
  it('Render Registered Counter', () => {
    render(
      <Provider store={store}>
        <RegisteredCounter capacity={capacity} count={count} />
      </Provider>,
    )
  })

  it('Render Registered Counter text using state initial value', () => {
    render(
      <Provider store={store}>
        <RegisteredCounter capacity={capacity} count={count} />
      </Provider>,
    )
    const paragraph = document.body
    expect(paragraph.textContent).toBe('0/10')
  })
})
