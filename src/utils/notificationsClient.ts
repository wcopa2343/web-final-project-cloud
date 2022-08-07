import {
  GetNotificationsProps,
  GetNotificationsResponse,
  UpdateNotificationProps,
  UpdateNotificationsProps,
} from '../redux/types'

let routes: string

if (process.env.REACT_APP_API !== undefined) {
  routes = `${process.env.REACT_APP_API}/notifications`
}

export async function getNotificationsByEmail({
  email,
  token,
}: GetNotificationsProps): Promise<GetNotificationsResponse> {
  try {
    const response = await fetch(routes, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selector: {
          User: {
            Email: email,
          },
        },
        execution_stats: true,
      }),
    })
    const results = await response.json()
    return {
      count: results.execution_stats.results_returned,
      notifications: results.docs,
    }
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function updateNotification({
  body,
  token,
}: UpdateNotificationProps): Promise<any> {
  try {
    const result = await fetch(`${routes}/${body._id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function updateNotifications({
  notifications,
  token,
}: UpdateNotificationsProps): Promise<any> {
  const bulkUpdate = '_bulk_docs'
  try {
    const result = await fetch(`${routes}/${bulkUpdate}`, {
      method: 'POST',
      body: JSON.stringify({ docs: notifications }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    throw new Error(error.toString())
  }
}
