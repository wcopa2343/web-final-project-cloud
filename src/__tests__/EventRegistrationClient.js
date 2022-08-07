import fetchMock from 'jest-fetch-mock'

import {
  deleteRegistration,
  getRegisteredUserByEvent,
  getRegistrationsByEvent,
  postRegistration,
} from '../utils/client'

fetchMock.enableMocks()

const error = new Error('fake error message')
const wrappedError = new Error(error.toString())

beforeEach(() => {
  fetch.resetMocks()
})

it('postRegistration', async () => {
  const URL = 'http://actio.test/v1.0/events/someEventId/registrations'
  const REQUEST = {
    body: JSON.stringify({ userId: 15 }),
    headers: {
      Authorization: 'Bearer tokenString',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await postRegistration({
    body: { userId: 15 },
    eventId: 'someEventId',
    token: 'tokenString',
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('postRegistration Fails', async () => {
  fetch.mockReject(error)
  try {
    await postRegistration({
      body: { userId: 15 },
      eventId: 'someEventId',
      token: 'tokenString',
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('getAllRegistrationsForEvent', async () => {
  const URL = 'http://actio.test/v1.0/events/someEventId/registrations'
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await getRegistrationsByEvent('someEventId')
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('getAllRegistrationsForEvent Fails', async () => {
  fetch.mockReject(error)
  try {
    await getRegistrationsByEvent('someEventId')
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('getUserRegistration', async () => {
  const URL = 'http://actio.test/v1.0/events/someEventId/registrations/15'
  const REQUEST = {
    headers: {
      Authorization: 'Bearer tokenString',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await getRegisteredUserByEvent({
    eventId: 'someEventId',
    userId: 15,
    token: 'tokenString',
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('getUserRegistration Fails', async () => {
  fetch.mockReject(error)
  try {
    await getRegisteredUserByEvent({
      eventId: 'someEventId',
      userId: 15,
      token: 'tokenString',
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('deleteUserRegistration', async () => {
  const URL = 'http://actio.test/v1.0/events/someEventId/registrations/15'
  const REQUEST = {
    headers: {
      Authorization: 'Bearer tokenString',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await deleteRegistration({
    eventId: 'someEventId',
    userId: 15,
    token: 'tokenString',
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('deleteUserRegistration Fails', async () => {
  fetch.mockReject(error)
  try {
    await deleteRegistration({
      eventId: 'someEventId',
      userId: 15,
      token: 'tokenString',
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})
