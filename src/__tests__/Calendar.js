import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import Calendar from '../components/Calendar'
import store from '../redux/store'

const fakeEvent = {
  category: '',
  description: '',
  endDate: '',
  id: '',
  imageUrl: '',
  name: '',
  speaker: '',
  startDate: '',
  status: '',
  summary: '',
  tags: '',
}

test('Calendar is rendering', () => {
  render(
    <Provider store={store}>
      <Calendar events={[fakeEvent]} />
    </Provider>,
  )
})
