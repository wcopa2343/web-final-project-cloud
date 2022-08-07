import fetchMock from 'jest-fetch-mock'

import {
  getUserById,
  patchUserInformation,
  patchUserPassword,
} from '../utils/authClient'

fetchMock.enableMocks()

const error = new Error('fake error message')
const wrappedError = new Error(error.toString())

beforeEach(() => {
  fetch.resetMocks()
})

it('getUserInformation', async () => {
  const URL = 'http://actio.test/v1.0/users/[object Object]'
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await getUserById({
    userId: 15,
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('getUserInformation Fails', async () => {
  fetch.mockReject(error)
  try {
    await getUserById({
      userId: 15,
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('patchUserInformation', async () => {
  const URL = 'http://actio.test/v1.0/users/undefined'
  const REQUEST = {
    body: JSON.stringify({ userId: 15 }),
    headers: {
      Authorization: 'Bearer tokenString',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await patchUserInformation({
    body: { userId: 15 },
    eventId: 'someEventId',
    token: 'tokenString',
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('patchUserInformation Fails', async () => {
  fetch.mockReject(error)
  try {
    await patchUserInformation({
      body: { userId: 15 },
      eventId: 'someEventId',
      token: 'tokenString',
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('patchUserPassword', async () => {
  const URL = 'http://actio.test/v1.0/users/15/password'
  const REQUEST = {
    body: JSON.stringify({
      pasword: '1234',
      field: 'user_password',
      value: '4321',
    }),
    headers: {
      Authorization: 'Bearer tokenString',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await patchUserPassword({
    body: { pasword: '1234', field: 'user_password', value: '4321' },
    userId: 15,
    token: 'tokenString',
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('patchUserPassword Fails', async () => {
  fetch.mockReject(error)
  try {
    await patchUserPassword({
      body: { pasword: '1234', field: 'user_password', value: '4321' },
      userId: 15,
      token: 'tokenString',
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})
