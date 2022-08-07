import { buildQueryParams } from './pathBuilder'
import { Registration, Wrapper } from '../redux/stateTypes'

import {
  CreateEvent,
  CreateRegistration,
  Event,
  EventByIdData,
  EventDeleteData,
  EventUpdateData,
  Filter,
  InvitationData,
  Users,
} from '../redux/types'

let routes: string
interface CreateRegistrationData {
  body: CreateRegistration
  eventId: string
  token?: string
}
interface RegistrationData {
  eventId: string
  token?: string
  userId?: number
}

if (process.env.REACT_APP_API !== undefined) {
  routes = `${process.env.REACT_APP_API}/events`
}

export async function getEvents(filter?: Filter): Promise<Wrapper> {
  try {
    const path = filter ? `${routes}${buildQueryParams(filter)}` : routes
    const response = await fetch(path)
    const results = await response.json()
    return results
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function getEventById({
  id,
  token,
}: EventByIdData): Promise<Event> {
  const headers: any = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  try {
    const response = await fetch(`${routes}/${id}`, {
      method: 'GET',
      headers,
    })
    const results = await response.json()
    return results
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function postEvent(params: CreateEvent): Promise<Event> {
  try {
    const { token, ...body } = params
    const res = await fetch(routes, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${token}`,
      },
    })
    const result = await res.json()
    return result
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function putEvent({
  body,
  eventId,
  token,
}: EventUpdateData): Promise<Event> {
  try {
    await fetch(`${routes}/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return { ...body }
  } catch (error) {
    throw new Error(error.toString())
  }
}

interface deleteReturn {
  status: number
  eventId?: string
}

export async function deleteEvent({
  eventId,
  token,
}: EventDeleteData): Promise<deleteReturn> {
  try {
    const res = await fetch(`${routes}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return { status: res.status, eventId }
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function postRegistration({
  body,
  eventId,
  token,
}: CreateRegistrationData): Promise<{ id: string }> {
  try {
    const res = await fetch(`${routes}/${eventId}/registrations`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await res.json()
    return result
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function getRegistrationsByEvent(
  eventId: string,
): Promise<Users[]> {
  try {
    const res = await fetch(`${routes}/${eventId}/registrations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const results = await res.json()
    return results
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function getRegisteredUserByEvent({
  eventId,
  userId,
  token,
}: RegistrationData): Promise<{ id: string }> {
  try {
    const res = await fetch(`${routes}/${eventId}/registrations/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const results = await res.json()
    return results
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function deleteRegistration({
  eventId,
  userId,
  token,
}: RegistrationData): Promise<number> {
  try {
    const res = await fetch(`${routes}/${eventId}/registrations/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return res.status
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function postInvitation({
  eventId,
  email,
  token,
}: InvitationData) {
  try {
    const res = await fetch(`${routes}/${eventId}/invitations`, {
      method: 'POST',
      body: JSON.stringify({ email, eventId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await res.json()
    return result
  } catch (error) {
    throw new Error(error.toString())
  }
}
