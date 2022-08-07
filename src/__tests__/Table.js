import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import { Table } from '../components/Table'
import store from '../redux/store'

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function generateString(length) {
  let result = ' '
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const fakeEvent = p => ({
  category: 'Frontend',
  description: 'This is the test description for the unit tests.',
  endDate: '2020-11-29',
  id: generateString(24),
  name: 'Test Event',
  speaker: 'Test Speaker',
  startDate: '2020-11-29',
  status: 'Draft',
  summary: 'This is the test summary for the unit tests',
  tags: 'Tech,Development',
})
const fakeEventList = Array(5).fill(null).map(fakeEvent)

test(' Table is rendering', () => {
  render(
    <Provider store={store}>
      <Table eventList={fakeEventList} />
    </Provider>,
  )
})
