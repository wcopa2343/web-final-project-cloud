import fetchMock from 'jest-fetch-mock'

import {
  createConference,
  getConferences,
  getConferencesById,
  insertEvent,
  removeEvent,
  updateConference,
} from '../utils/conferenceClient'

fetchMock.enableMocks()

const error = new Error('fake error message')
const wrappedError = new Error(error.toString())

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp'
const fakeId = '5fee204c7e0529361e288bdb'

const fakeConference = {
  bannerUrl: '',
  conferenceName: 'Fake Conference',
  createdBy: 2,
  description: 'Brief Description of the conference',
  endDate: '2020-12-31T00:00:00Z',
  imageUrl: '',
  logoUrl: '',
  startDate: '2020-12-28T00:00:00Z',
}

const fakeCreate = {
  ...fakeConference,
  ...fakeToken,
}

const fakeUpdate = {
  bannerUrl: '',
  conferenceName: 'Fake Conference',
  createdBy: 2,
  description: 'Brief Description of the conference',
  endDate: '2020-12-31T00:00:00Z',
  eventsId: [],
  id: '5fee204c7e0529361e288bdb',
  imageUrl: '',
  logoUrl: '',
  startDate: '2020-12-28T00:00:00Z',
  conferenceId: '5fee204c7e0529361e288bdb',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp',
}

const fakePatchContent = {
  actionType: 'Insert',
  eventsArray: ['1', '2'],
}

beforeEach(() => {
  fetch.resetMocks()
})

it('createConference', async () => {
  const URL = 'http://actio.test/v1.0/conferences'
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
  await createConference(fakeCreate)
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('createConference Fails', async () => {
  fetch.mockReject(error)
  try {
    await createConference(fakeCreate)
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('getConferences', async () => {
  const URL = 'http://actio.test/v1.0/conferences'
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await getConferences()
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('getConferences Fails', async () => {
  fetch.mockReject(error)
  try {
    await getConferences()
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('getConferencesById', async () => {
  const URL = `http://actio.test/v1.0/conferences/${fakeId}`
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await getConferencesById(fakeId)
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('getConferencesById Fails', async () => {
  fetch.mockReject(error)
  try {
    await getConferencesById(fakeId)
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})
it('insertEvent', async () => {
  const URL = `http://actio.test/v1.0/conferences/${fakeId}`
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${fakeToken}`,
    },
    body: JSON.stringify(fakePatchContent),
    method: 'PATCH',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await insertEvent({
    conferenceId: fakeId,
    content: fakePatchContent,
    token: fakeToken,
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('insertConference Fails', async () => {
  fetch.mockReject(error)
  try {
    await insertEvent({ conferenceId: fakeId, eventId: fakeId })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('removeEvent', async () => {
  const URL = `http://actio.test/v1.0/conferences/${fakeId}`
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${fakeToken}`,
    },
    body: JSON.stringify(fakePatchContent),
    method: 'PATCH',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await removeEvent({
    conferenceId: fakeId,
    content: fakePatchContent,
    token: fakeToken,
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('removeConference Fails', async () => {
  fetch.mockReject(error)
  try {
    await removeEvent({ conferenceId: fakeId, eventId: fakeId })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('updateConference', async () => {
  const { conferenceId, token, body } = fakeUpdate
  const URL = `http://actio.test/v1.0/conferences/${conferenceId}`
  const REQUEST = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer  ${token}`,
    },
    method: 'PUT',
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await updateConference(fakeUpdate)
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('updateConference Fails', async () => {
  fetch.mockReject(error)
  try {
    await updateConference(fakeUpdate)
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})
