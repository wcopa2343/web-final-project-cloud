import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  GetNotificationsProps,
  NotificationState,
  UpdateNotificationProps,
  UpdateNotificationsProps,
} from '../redux/types'
import {
  getNotificationsByEmail,
  updateNotification,
  updateNotifications,
} from '../utils/notificationsClient'

export const initialState: NotificationState = {
  isNew: 0,
  notifications: [],
  update: false,
}

export const fetchNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async (data: GetNotificationsProps) => {
    return await getNotificationsByEmail(data)
  },
)

export const markViewedNotification = createAsyncThunk(
  'notifications/markViewed',
  async (data: UpdateNotificationProps) => {
    return await updateNotification(data)
  },
)

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (data: UpdateNotificationsProps) => {
    return await updateNotifications(data)
  },
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload.notifications
      state.isNew = action.payload.notifications.filter(
        (notification: any) => notification.IsNew === true,
      ).length
      state.update = false
    })
    builder.addCase(markViewedNotification.fulfilled, state => {
      state.update = true
    })
    builder.addCase(markAllNotificationsAsRead.fulfilled, state => {
      state.update = true
    })
  },
})

export const getNotifications = ({ notifications }: any): any => notifications

export default notificationsSlice.reducer
