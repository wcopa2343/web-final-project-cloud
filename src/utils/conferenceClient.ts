import {
  AddRemoveEvent,
  Conference,
  ConferencesFilter,
  ConferenceUpdateData,
  CreateConference,
} from '../redux/types'
import { buildQueryParams } from './pathBuilder'

let routes: string

if (process.env.REACT_APP_API !== undefined) {
  routes = `${process.env.REACT_APP_API}/conferences`
}

export async function getConferences(
  filters?: ConferencesFilter,
): Promise<Conference[]> {
  try {
    const path = filters ? `${routes}${buildQueryParams(filters)}` : routes
    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const results = await response.json()
    return results
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function getConferencesById(id: string): Promise<Conference> {
  try {
    const response = await fetch(`${routes}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const results = await response.json()
    return results
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function createConference(
  params: CreateConference,
): Promise<Conference> {
  try {
    const { token, ...body } = params
    const response = await fetch(routes, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${token}`,
      },
    })
    const results = await response.json()
    return results
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function updateConference({
  body,
  conferenceId,
  token,
}: ConferenceUpdateData): Promise<void> {
  try {
    await fetch(`${routes}/${conferenceId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${token}`,
      },
    })
  } catch (error) {
    throw new Error(error.toString())
  }
}

interface insertRemoveReturn {
  status: number
  events: string[]
}

export async function insertEvent({
  conferenceId,
  content,
  token,
}: AddRemoveEvent): Promise<insertRemoveReturn> {
  try {
    const response = await fetch(`${routes}/${conferenceId}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return { events: content.eventsArray, status: response.status }
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function removeEvent({
  conferenceId,
  content,
  token,
}: AddRemoveEvent): Promise<string[]> {
  try {
    await fetch(`${routes}/${conferenceId}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return content.eventsArray
  } catch (error) {
    throw new Error(error.toString())
  }
}
