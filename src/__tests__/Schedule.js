import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import ListItem from '../components/common/ListItem'
import Schedule from '../components/common/Schedule'
import store from '../redux/store'

test('List Item is rendering', () => {
  render(
    <Provider store={store}>
      <ListItem />
    </Provider>,
  )
})

const fakeEvents = [
  {
    category: '',
    description: '',
    endDate: new Date().toISOString(),
    id: '',
    imageUrl: '',
    name: '',
    speaker: '',
    startDate: new Date().toISOString(),
    status: '',
    summary: '',
    tags: '',
  },
  {
    category: '',
    description: '',
    endDate: new Date().toISOString(),
    id: '',
    imageUrl: '',
    name: '',
    speaker: '',
    startDate: new Date().toISOString(),
    status: '',
    summary: '',
    tags: '',
  },
]

test('Schedule is rendering', () => {
  render(
    <Provider store={store}>
      <Schedule events={fakeEvents} />
    </Provider>,
  )
})
