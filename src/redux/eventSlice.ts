import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getEventById } from '../utils/client'
import { EventReducer, StoreState } from './stateTypes'
import { EventByIdData, EventStatus, Status } from './types'

const initialState: EventReducer = {
  error: {
    code: '',
    message: '',
  },
  event: {
    capacity: 0,
    category: '',
    description: '',
    endDate: '',
    id: '',
    imageUrl: '',
    isLinkVisible: false,
    meetingLink: '',
    name: '',
    speaker: '',
    startDate: '',
    status: EventStatus.DRAFT,
    summary: '',
    tags: '',
    createdBy: 0,
  },
  status: Status.IDLE,
}

export const fetchById = createAsyncThunk(
  'events/fetchById',
  async (data: EventByIdData) => {
    return await getEventById(data)
  },
)

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchById.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchById.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.event = action.payload
    })
    builder.addCase(fetchById.rejected, state => {
      state.status = Status.FAILED
    })
  },
})

export const singleEvent = ({ event }: StoreState): EventReducer => event
export default eventSlice.reducer
