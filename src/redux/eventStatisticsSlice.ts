import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getAllEventsCount } from '../utils/eventStatisticsClient'
import { EventStatisticsReducer, StoreState } from './stateTypes'
import { Status } from './types'

const initialState: EventStatisticsReducer = {
  generalEventStatistics: {
    allEventsCount: 0,
    allActiveEventsCount: 0,
  },
  error: {
    code: '',
    message: '',
  },
  status: Status.IDLE,
}

export const fetchAllEventsCount = createAsyncThunk(
  'eventStatistics/fetchAllEventsCount',
  async () => {
    return await getAllEventsCount()
  },
)

export const eventStatisticsSlice = createSlice({
  name: 'eventStatistics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllEventsCount.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchAllEventsCount.fulfilled, (state, { payload }) => {
      state.generalEventStatistics = payload
      state.status = Status.SUCCEEDED
    })
    builder.addCase(fetchAllEventsCount.rejected, state => {
      state.status = Status.FAILED
    })
  },
})
export const eventStatistics = ({
  eventStatistics,
}: StoreState): EventStatisticsReducer => eventStatistics
export default eventStatisticsSlice.reducer
