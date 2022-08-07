import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { authSlice } from './authSlice'
import { conferenceSlice } from './conferenceSlice'
import { conferencesSlice } from './conferencesSlice'
import { eventSlice } from './eventSlice'
import { eventsSlice } from './eventsSlice'
import { eventStatisticsSlice } from './eventStatisticsSlice'
import { notificationsSlice } from './notificationsSlice'
import { registrationSlice } from './registrationSlice'
import { registrationsSlice } from './registrationsSlice'
import { userSlice } from './userSlice'

const persistConfig = {
  blacklist: ['requestError', 'requestErrorCode', 'requestStatus'],
  key: 'auth',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer)
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    conference: conferenceSlice.reducer,
    conferences: conferencesSlice.reducer,
    event: eventSlice.reducer,
    events: eventsSlice.reducer,
    eventStatistics: eventStatisticsSlice.reducer,
    notifications: notificationsSlice.reducer,
    registration: registrationSlice.reducer,
    registrations: registrationsSlice.reducer,
    user: userSlice.reducer,
  },
  // TODO, This check is temporal, a better solution must be implemented
  // in order to avoid non-serialized objects in reducers
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export default store
