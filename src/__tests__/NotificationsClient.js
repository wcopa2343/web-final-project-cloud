import fetchMock from 'jest-fetch-mock'

import {
  getNotificationsByEmail,
  updateNotification,
  updateNotifications,
} from '../utils/notificationsClient'

fetchMock.enableMocks()

const error = new Error('fake error message')
const wrappedError = new Error(error.toString())

beforeEach(() => {
  fetch.resetMocks()
})

it('Get Notifications', async () => {
  const URL = 'http://actio.test/v1.0/notifications'
  const body = {
    selector: {
      User: {
        Email: 'test@example.com',
      },
    },
    execution_stats: true,
  }
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer someToken',
    },
    method: 'POST',
    body: JSON.stringify(body),
  }
  fetch.mockResponseOnce(
    JSON.stringify({
      execution_stats: { results_returned: 0 },
      docs: [],
    }),
  )
  await getNotificationsByEmail({
    email: 'test@example.com',
    token: 'someToken',
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('Get Notifications Fails', async () => {
  fetch.mockReject(error)
  try {
    await getNotificationsByEmail({
      email: 'test@example.com',
      token: 'someToken',
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('Update Notification', async () => {
  const URL = 'http://actio.test/v1.0/notifications/notificationId'
  const body = { _id: 'notificationId' }
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer someToken',
    },
    method: 'PUT',
    body: JSON.stringify(body),
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await updateNotification({
    body: { _id: 'notificationId' },
    token: 'someToken',
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('Update Notification Fails', async () => {
  fetch.mockReject(error)
  try {
    await updateNotification({
      body: { _id: 'notificationId' },
      token: 'someToken',
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})

it('Update Notifications', async () => {
  const URL = 'http://actio.test/v1.0/notifications/_bulk_docs'
  const body = { docs: [{ _id: 'notificationId' }, { _id: 'notificationId' }] }
  const REQUEST = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer someToken',
    },
    method: 'POST',
    body: JSON.stringify(body),
  }
  fetch.mockResponseOnce(JSON.stringify({}))
  await updateNotifications({
    notifications: [{ _id: 'notificationId' }, { _id: 'notificationId' }],
    token: 'someToken',
  })
  expect(fetch).toHaveBeenCalledWith(URL, REQUEST)
})

it('Update Notifications Fails', async () => {
  fetch.mockReject(error)
  try {
    await updateNotifications({
      notifications: [{ _id: 'notificationId' }, { _id: 'notificationId' }],
      token: 'someToken',
    })
  } catch (e) {
    expect(e).toEqual(wrappedError)
  }
})
