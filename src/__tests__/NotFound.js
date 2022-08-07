import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import NotFound from '../screens/NotFound'
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

describe('Not Found Component Tests', () => {
  it('Render Form', () => {
    render(<NotFound />)
  })
})
