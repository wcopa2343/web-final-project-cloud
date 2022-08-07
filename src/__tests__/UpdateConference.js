import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'

import UpdateConferenceForm from '../components/UpdateConferenceForm'
import store from '../redux/store'
import { EventStatus } from '../redux/types'

const testConference = {
  bannerUrl: 'testBanner',
  conferenceName: 'This is a conference title for a conference test',
  description:
    'This is a very very very very very long description for a conference test',
  endDate: '2021-01-19T15:43',
  eventsId: ['1', '2'],
  id: 'string',
  imageUrl: 'string',
  logoUrl: 'string',
  startDate: '2021-01-18T15:43',
  status: EventStatus.PUBLISHED,
}
test('Coference form loads files', () => {
  render(
    <Provider store={store}>
      <UpdateConferenceForm conference={testConference} />
    </Provider>,
  )
})

test('Form Submitting', async () => {
  const fakeToken = ''
  const handleSubmit = jest.fn()
  const getImage = jest.fn()
  render(
    <Provider store={store}>
      <UpdateConferenceForm
        conference={testConference}
        handleSubmit={handleSubmit}
      />
    </Provider>,
  )
  await waitFor(() => {
    userEvent.click(
      screen.getByRole('button', {
        name: /update/i,
      }),
    )
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
