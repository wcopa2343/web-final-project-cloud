import {
  UserAccessInfo,
  UserCredentials,
  UserInformationUpdateData,
  UserPatchRequestData,
} from '../redux/types'

let authRoute: string

if (process.env.REACT_APP_API !== undefined) {
  authRoute = process.env.REACT_APP_API
}

export async function postAuth(body: UserAccessInfo) {
  try {
    const res = await fetch(`${authRoute}/token`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json()
    return { result, status: res.status }
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function postCreate(body: UserAccessInfo) {
  try {
    const res = await fetch(`${authRoute}/users`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json()
    return { result, status: res.status }
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function revokeAuth({
  email,
  token,
  username,
  userId,
}: UserCredentials) {
  try {
    const bodyContent = {
      email,
      username,
      userId,
    }
    const res = await fetch(`${authRoute}/token/revoke`, {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return { status: res.status }
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function patchUserInformation({
  userId,
  body,
  token,
}: UserInformationUpdateData) {
  try {
    const response = await fetch(`${authRoute}/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const result = await response.json()
    return { result, status: response.status }
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function getUserById(userId: number | undefined) {
  try {
    const response = await fetch(`${authRoute}/users/${userId}`, {
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

export async function patchUserPassword({
  body,
  token,
  userId,
}: UserPatchRequestData) {
  try {
    const res = await fetch(`${authRoute}/users/${userId}/password`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return { status: res.status }
  } catch (error) {
    throw new Error(error.toString())
  }
}

export async function postOAuth(body: any) {
  try {
    const res = await fetch(`${authRoute}/token/oauth`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json()
    return { result, status: res.status }
  } catch (error) {
    throw new Error(error.toString())
  }
}
