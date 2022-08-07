import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { deleteEvent, getEvents, postEvent, putEvent } from '../utils/client'
import { EventsReducer, StoreState } from './stateTypes'
import {
  CreateEvent,
  EventDeleteData,
  EventUpdateData,
  Filter,
  HttpStatuses,
  Status,
} from './types'

const initialState: EventsReducer = {
  events: {
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
    value: [],
  },
  error: {
    code: '',
    message: '',
  },
  hasMore: true,
  status: Status.IDLE,
}

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (filter?: Filter) => {
    return await getEvents(filter)
  },
)

export const loadEvents = createAsyncThunk(
  'events/loadMoreEvents',
  async (filter?: Filter) => {
    return await getEvents(filter)
  },
)

export const createEvent = createAsyncThunk(
  'events/postEvents',
  async (body: CreateEvent) => {
    return await postEvent(body)
  },
)

export const modifyEvent = createAsyncThunk(
  'events/updateEvent',
  async (data: EventUpdateData) => {
    return await putEvent(data)
  },
)

export const removeEvent = createAsyncThunk(
  'events/deleteEvent',
  async (data: EventDeleteData) => {
    return await deleteEvent(data)
  },
)

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    MoreEvents(state) {
      state.hasMore = true
    },
    noMoreEvents(state) {
      state.hasMore = false
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCEEDED
      state.hasMore = true
      state.events = payload
    })
    builder.addCase(fetchEvents.rejected, state => {
      state.status = Status.FAILED
    })

    builder.addCase(loadEvents.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(loadEvents.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCEEDED
      state.events.value = [...state.events.value, ...payload.value]
    })

    builder.addCase(createEvent.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCEEDED
      state.events.value.push(payload)
    })

    builder.addCase(modifyEvent.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCEEDED
      const { id: modifiedEventId } = payload
      let modifiedEvent = state.events.value.find(
        event => event.id === modifiedEventId,
      )
      if (modifiedEvent) modifiedEvent = { ...payload }
    })

    builder.addCase(removeEvent.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(removeEvent.fulfilled, (state, { payload }) => {
      const { status, eventId } = payload
      if (status === HttpStatuses.NO_CONTENT) {
        state.status = Status.SUCCEEDED
        state.events.value = state.events.value.filter(
          event => event.id !== eventId,
        )
        state.status = Status.SUCCEEDED
      } else {
        state.status = Status.FAILED
      }
    })
    builder.addCase(removeEvent.rejected, state => {
      state.status = Status.FAILED
    })
  },
})

export const selectAllEvents = ({ events }: StoreState): EventsReducer => events
export const { MoreEvents, noMoreEvents } = eventsSlice.actions
export default eventsSlice.reducer
