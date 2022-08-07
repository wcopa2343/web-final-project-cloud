import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  deleteRegistration,
  getRegisteredUserByEvent,
  postRegistration,
} from '../utils/client'
import { Registration, StoreState } from './stateTypes'
import { CreateRegistration, Status } from './types'

interface CreateData {
  body: CreateRegistration
  eventId: string
  token?: string
}

interface RegistrationData {
  eventId: string
  token?: string
  userId?: number
}

const initialState: Registration = {
  error: {
    code: '',
    message: '',
  },
  registration: undefined,
  status: Status.IDLE,
}

export const createRegistration = createAsyncThunk(
  'events/eventId/registrations',
  async (data: CreateData) => {
    return await postRegistration(data)
  },
)

export const checkEventRegistrationByUser = createAsyncThunk(
  'events/eventId/registrations/getByUserId',
  async (data: RegistrationData) => {
    return await getRegisteredUserByEvent(data)
  },
)

export const removeRegistration = createAsyncThunk(
  'events/eventId/registrations/deleteByUserId',
  async (data: RegistrationData) => {
    return await deleteRegistration(data)
  },
)

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createRegistration.pending, (state, { payload }) => {
      state.status = Status.LOADING
    })
    builder.addCase(createRegistration.fulfilled, (state, { payload }) => {
      if (payload.id) state.registration = true
      state.status = Status.SUCCEEDED
    })
    builder.addCase(createRegistration.rejected, state => {
      state.registration = false
      state.status = Status.FAILED
    })
    builder.addCase(removeRegistration.pending, (state, { payload }) => {
      state.status = Status.LOADING
    })
    builder.addCase(removeRegistration.fulfilled, (state, { payload }) => {
      if (payload === 204) state.registration = false
      state.status = Status.SUCCEEDED
    })
    builder.addCase(removeRegistration.rejected, state => {
      state.registration = true
      state.status = Status.FAILED
    })
    builder.addCase(
      checkEventRegistrationByUser.fulfilled,
      (state, { payload }) => {
        if (payload.id) state.registration = true
        else state.registration = false
        state.status = Status.SUCCEEDED
      },
    )
    builder.addCase(checkEventRegistrationByUser.rejected, state => {
      state.registration = false
      state.status = Status.FAILED
    })
  },
})

export const registeredForEvent = ({
  registration,
}: StoreState): Registration => registration
export default registrationSlice.reducer
