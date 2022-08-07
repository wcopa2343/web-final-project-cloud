import fetchMock from 'jest-fetch-mock'

import {
  deleteEvent,
  getEvents,
  getEventById,
  postEvent,
  putEvent,
  postInvitation,
} from '../utils/client'

fetchMock.enableMocks()

const fakeDelete = {
  eventId: '5fee204c7e0529361e288bdb',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp',
}

const fakeCreate = {
  ...fakeDelete,
  category: '',
  description: '',
  endDate: '',
  imageUrl: '',
  name: '',
  startDate: '',
  speaker: '',
  summary: '',
  tags: '',
}

const { token, eventId, ...fakeBody } = fakeCreate

const fakeUpdate = {
  eventId: eventId,
  body: fakeBody,
  token: token,
}

const error = new Error('fake error message')
const wrappedError = new Error(error.toString())

beforeEach(() => {
  fetch.resetMocks()
})

it('deleteEvent', async () => {
  const URL = `http://actio.test/v1.0/events/${fakeDelete.eventId}`
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${fakeDelete.token}`,
    },
    method: 'DELETE',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await deleteEvent(fakeDelete)
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('deleteEvent Fails', async () => {
  fetch.mockReject(error)
  try {
    await deleteEvent(fakeDelete)
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('getEvents', async () => {
  const URL = `http://actio.test/v1.0/events`
  fetch.mockResponseOnce(JSON.stringify({}))
  await getEvents()
  expect(fetch).toHaveBeenCalledWith(URL)
})

it('postEvent Fails', async () => {
  fetch.mockReject(error)
  try {
    await getEvents()
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('getEventById', async () => {
  const URL = `http://actio.test/v1.0/events/${fakeDelete.eventId}`
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await getEventById({ id: fakeDelete.eventId })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('getEventById and token', async () => {
  const URL = `http://actio.test/v1.0/events/${fakeDelete.eventId}`
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await getEventById({ id: fakeDelete.eventId, token })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('getEventById Fails', async () => {
  fetch.mockReject(error)
  try {
    await getEventById({ id: fakeDelete.eventId })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('postEvent', async () => {
  const URL = `http://actio.test/v1.0/events`
  const { token, ...body } = fakeCreate
  const REQUEST = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${token}`,
    },
    method: 'POST',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await postEvent(fakeCreate)
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('postEvent Fails', async () => {
  fetch.mockReject(error)
  try {
    await postEvent(fakeCreate)
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('putEvent', async () => {
  const { eventId, token, ...body } = fakeCreate
  const URL = `http://actio.test/v1.0/events/${eventId}`
  const REQUEST = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await putEvent(fakeUpdate)
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('putEvent Fails', async () => {
  fetch.mockReject(error)
  try {
    await putEvent(fakeUpdate)
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('Invite to Event', async () => {
  const URL = `http://actio.test/v1.0/events/event-id/invitations`
  const fakeInvite = {
    token,
    email: 'user@email.com',
    eventId: 'event-id',
  }
  const REQUEST = {
    body: JSON.stringify({
      email: fakeInvite.email,
      eventId: fakeInvite.eventId,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await postInvitation(fakeInvite)
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('Invite to tEvent Fails', async () => {
  const fakeInvite = {
    token,
    email: 'user@email.com',
    eventId: 'event-id',
  }
  fetch.mockReject(error)
  try {
    await postInvitation(fakeInvite)
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})
