import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ConferenceReducer, StoreState } from './stateTypes'
import {
  AddRemoveEvent,
  ConferenceUpdateData,
  EventStatus,
  HttpStatuses,
  Status,
} from './types'
import {
  getConferencesById,
  insertEvent,
  removeEvent,
  updateConference,
} from '../utils/conferenceClient'
import toast from '../utils/toast'

const initialState: ConferenceReducer = {
  conference: {
    bannerUrl: '',
    createdBy: 0,
    conferenceName: '',
    description: '',
    endDate: '',
    eventsId: [],
    id: '',
    imageUrl: '',
    logoUrl: '',
    startDate: '',
    status: EventStatus.DRAFT,
  },
  error: {
    code: '',
    message: '',
  },
  status: Status.IDLE,
  patchStatus: Status.IDLE,
}

export const fetchConferencesById = createAsyncThunk(
  'conference/fetchConferencesById',
  async (conferenceId: string) => {
    return await getConferencesById(conferenceId)
  },
)

export const modifyConference = createAsyncThunk(
  'conference/updateConference',
  async (body: ConferenceUpdateData) => {
    await updateConference(body)
    return body.body
  },
)

export const InsertIntoConference = createAsyncThunk(
  'conference/InsertIntoConference',
  async (params: AddRemoveEvent) => {
    return await insertEvent(params)
  },
)

export const RemoveFromConference = createAsyncThunk(
  'conference/RemoveFromConference',
  async (params: AddRemoveEvent) => {
    return await removeEvent(params)
  },
)

export const conferenceSlice = createSlice({
  name: 'conference',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchConferencesById.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchConferencesById.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.conference = action.payload
    })
    builder.addCase(fetchConferencesById.rejected, state => {
      state.status = Status.FAILED
    })
    builder.addCase(modifyConference.fulfilled, (state, action) => {
      state.conference = action.payload
    })
    builder.addCase(InsertIntoConference.fulfilled, (state, { payload }) => {
      if (payload.status === HttpStatuses.NO_CONTENT) {
        state.patchStatus = Status.SUCCEEDED
        state.conference.eventsId = [
          ...state.conference.eventsId,
          ...payload.events,
        ]
        toast({ action: 'success', message: 'events added to the conference' })
      }
    })
    builder.addCase(InsertIntoConference.pending, state => {
      state.patchStatus = Status.LOADING
    })
    builder.addCase(InsertIntoConference.rejected, state => {
      state.patchStatus = Status.FAILED
    })

    builder.addCase(RemoveFromConference.fulfilled, (state, action) => {
      const filtered = state.conference.eventsId.filter(index => {
        return !action.payload.find(item => {
          return index === item
        })
      })
      state.conference.eventsId = filtered
    })
  },
})

export const singleConference = ({
  conference,
}: StoreState): ConferenceReducer => conference
export default conferenceSlice.reducer
