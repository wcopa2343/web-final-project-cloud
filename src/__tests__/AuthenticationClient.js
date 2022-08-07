import fetchMock from 'jest-fetch-mock'

import {
  postAuth,
  postCreate,
  postOAuth,
  revokeAuth,
} from '../utils/authClient'

fetchMock.enableMocks()

const error = new Error('fake error message')
const wrappedError = new Error(error.toString())

beforeEach(() => {
  fetch.resetMocks()
})

const fakeUserAccessData = {
  email: 'fake@fake.com',
  pasword: 'abcde12345',
  username: 'fakeUser',
}

const fakeUserCredentials = {
  email: 'fake@fake.com',
  token: 'abcde12345',
  username: 'fakeUser',
  userId: 666,
}

it('Calling Authetication endpoint', async () => {
  const URL = 'http://actio.test/v1.0/token'
  const REQUEST = {
    body: JSON.stringify(fakeUserAccessData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await postAuth({
    ...fakeUserAccessData,
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('Calling Authetication endpoint Fails', async () => {
  fetch.mockReject(error)
  try {
    await postAuth({
      ...fakeUserAccessData,
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('Calling Signup endpoint', async () => {
  const URL = 'http://actio.test/v1.0/users'
  const REQUEST = {
    body: JSON.stringify(fakeUserAccessData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await postCreate({
    ...fakeUserAccessData,
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('Calling Signup endpoint Fails', async () => {
  fetch.mockReject(error)
  try {
    await postCreate({
      ...fakeUserAccessData,
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('Calling Logout endpoint', async () => {
  const { email, token, username, userId } = fakeUserCredentials
  const URL = 'http://actio.test/v1.0/token/revoke'
  const REQUEST = {
    body: JSON.stringify({ email, username, userId }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await revokeAuth({
    ...fakeUserCredentials,
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('Calling Logout endpoint Fails', async () => {
  fetch.mockReject(error)
  try {
    await revokeAuth({
      ...fakeUserCredentials,
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('Calling Oauthentication endpoint', async () => {
  const URL = 'http://actio.test/v1.0/token/oauth'
  const REQUEST = {
    body: JSON.stringify(fakeUserAccessData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await postOAuth({
    ...fakeUserAccessData,
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('Calling Oauthentication endpoint Fails', async () => {
  fetch.mockReject(error)
  try {
    await postOAuth({
      ...fakeUserAccessData,
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})
