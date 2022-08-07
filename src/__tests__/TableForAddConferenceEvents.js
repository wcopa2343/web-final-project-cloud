import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import faker from 'faker'
import { Provider } from 'react-redux'

import { TableForAddConferenceEvents as Table } from '../components/TableForAddConferenceEvents'
import store from '../redux/store'

const fakeEvent = p => ({
  category: 'Frontend',
  conferenceId: faker.random.alphaNumeric(),
  description: 'This is the test description for the unit tests.',
  endDate: '2021-02-02',
  id: faker.random.alphaNumeric(),
  name: 'Test Event',
  speaker: 'Test Speaker',
  startDate: '2021-02-01',
  status: 'Draft',
  summary: 'This is the test summary for the unit tests',
  tags: 'Tech,Development',
})
const fakeEventList = Array(3).fill(null).map(fakeEvent)

describe('Rendering the table', () => {
  test(' Table for Add Events into a conference', () => {
    const fakeClickContinue = jest.fn()
    render(
      <Provider store={store}>
        <Table
          eventList={fakeEventList}
          handleClickContinue={fakeClickContinue}
        />
      </Provider>,
    )

    userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(fakeClickContinue).toHaveBeenCalledTimes(1)
  })
})
