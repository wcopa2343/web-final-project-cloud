import fetchMock from 'jest-fetch-mock'

import { getAllEventsCount } from '../utils/eventStatisticsClient'

fetchMock.enableMocks()

const error = new Error('fake error message')
const wrappedError = new Error(error.toString())

beforeEach(() => {
  fetch.resetMocks()
})

it('getAllEventsCount', async () => {
  const URL = 'http://actio.test/v1.0/eventStatistics/'
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await getAllEventsCount()
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('getAllEventsCount Fails', async () => {
  fetch.mockReject(error)
  try {
    await getAllEventsCount()
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})
