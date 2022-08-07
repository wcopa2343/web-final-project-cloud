import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getRegistrationsByEvent } from '../utils/client'
import { Registrations, StoreState } from './stateTypes'
import { Status, Users } from './types'

export interface RegistrationsData {
  eventId: string
}

const initialState: Registrations = {
  count: 0,
  error: {
    code: '',
    message: '',
  },
  status: Status.IDLE,
  registrationList: [],
}

export const getEventRegistrations = createAsyncThunk(
  'events/eventId/getRegistrations',
  async ({ eventId }: RegistrationsData) => {
    return await getRegistrationsByEvent(eventId)
  },
)

export const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEventRegistrations.pending, (state, { payload }) => {
      state.status = Status.LOADING
    })
    builder.addCase(getEventRegistrations.fulfilled, (state, { payload }) => {
      state.count = payload.length
      state.registrationList = payload
      state.status = Status.SUCCEEDED
    })
    builder.addCase(getEventRegistrations.rejected, state => {
      state.status = Status.FAILED
    })
  },
})

export const registrationsByEvent = ({
  registrations,
}: StoreState): Registrations => registrations
export default registrationsSlice.reducer
