import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  postAuth,
  postCreate,
  postOAuth,
  revokeAuth,
} from '../utils/authClient'
import { Authentication, StoreState, userInfo } from './stateTypes'
import {
  getHttpStatusMessage,
  HttpStatuses,
  Status,
  UserAccessInfo,
  UserCredentials,
  UserFriendlyMessages,
} from './types'
import { modifyUserInformation } from './userSlice'

const emptyUserData: userInfo = {
  email: '',
  pictureUrlProfile: '',
  token: '',
  username: '',
  userId: undefined,
}

const initialState: Authentication = {
  userInfo: emptyUserData,
  loggedIn: false,
  requestError: '',
  requestErrorCode: undefined,
  requestStatus: Status.IDLE,
}

export const authUser = createAsyncThunk(
  'user/auth',
  async (body: UserAccessInfo) => {
    return await postAuth(body)
  },
)

export const createUser = createAsyncThunk(
  'user/create',
  async (body: UserAccessInfo) => {
    return await postCreate(body)
  },
)

export const logOutUser = createAsyncThunk(
  'user/revoke',
  async (body: UserCredentials) => {
    return await revokeAuth(body)
  },
)

export const oauthUser = createAsyncThunk('user/oauth', async (body: any) => {
  return await postOAuth(body)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    forceLogOut(state) {
      state.loggedIn = false
      state.userInfo = emptyUserData
      state.requestError = ''
      state.requestErrorCode = undefined
      state.requestStatus = Status.IDLE
    },
    clearRequestError(state) {
      state.requestError = ''
      state.requestErrorCode = undefined
      state.requestStatus = Status.IDLE
    },
    oauthRequestError(state) {
      state.requestError = 'External authentication error'
      state.requestErrorCode = 500
      state.requestStatus = Status.IDLE
    },
  },
  extraReducers: builder => {
    builder.addCase(authUser.pending, state => {
      state.requestStatus = Status.LOADING
    })
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.requestStatus = Status.SUCCEEDED
      if (payload.status === HttpStatuses.OK) {
        const {
          email,
          pictureUrlProfile,
          token,
          userId,
          userName,
        } = payload.result
        state.userInfo = {
          email,
          pictureUrlProfile,
          token,
          userId,
          username: userName,
        }
        state.loggedIn = true
        state.requestError = ''
        state.requestErrorCode = undefined
      } else if (payload.status === HttpStatuses.UNAUTHORIZED) {
        state.requestError = UserFriendlyMessages.WRONG_USERNAME_PASSWORD
        state.requestErrorCode = payload.status
        state.loggedIn = false
        state.userInfo = emptyUserData
      } else {
        state.requestError = UserFriendlyMessages.INTERNAL_SERVER_ERROR
        state.requestErrorCode = payload.status
        state.loggedIn = false
        state.userInfo = emptyUserData
      }
    })
    builder.addCase(authUser.rejected, (state, action) => {
      state.requestStatus = Status.FAILED
      state.requestError = UserFriendlyMessages.INTERNAL_SERVER_ERROR
      state.requestErrorCode = undefined
    })
    builder.addCase(oauthUser.pending, state => {
      state.requestStatus = Status.LOADING
    })
    builder.addCase(oauthUser.rejected, (state, action) => {
      state.requestStatus = Status.FAILED
      state.requestError = UserFriendlyMessages.INTERNAL_SERVER_ERROR
      state.requestErrorCode = undefined
    })
    builder.addCase(oauthUser.fulfilled, (state, { payload }) => {
      state.requestStatus = Status.SUCCEEDED
      if (payload.status === HttpStatuses.OK) {
        const {
          email,
          pictureUrlProfile,
          token,
          userId,
          userName,
        } = payload.result
        state.userInfo = {
          email,
          pictureUrlProfile,
          token,
          userId,
          username: userName,
        }
        state.loggedIn = true
        state.requestError = ''
        state.requestErrorCode = undefined
      } else {
        state.requestError = UserFriendlyMessages.INTERNAL_SERVER_ERROR
        state.requestErrorCode = payload.status
        state.loggedIn = false
        state.userInfo = emptyUserData
      }
    })
    builder.addCase(createUser.pending, state => {
      state.requestStatus = Status.LOADING
    })
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.requestStatus = Status.SUCCEEDED
      if (payload.status === HttpStatuses.CREATED) {
        const { userName: username, ...rest } = payload.result
        state.userInfo = {
          ...rest,
          username,
        }
        state.loggedIn = true
        state.requestError = ''
        state.requestErrorCode = undefined
      } else {
        const { message, code } = payload.result.error
        state.userInfo = emptyUserData
        state.loggedIn = false
        state.requestErrorCode = payload.status
        switch (payload.status) {
          case HttpStatuses.CONFLICT:
            state.requestError = message
            break
          default:
            state.requestError = UserFriendlyMessages.INTERNAL_SERVER_ERROR
            break
        }
      }
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.requestStatus = Status.FAILED
      state.requestError = UserFriendlyMessages.INTERNAL_SERVER_ERROR
      state.requestErrorCode = undefined
    })

    builder.addCase(logOutUser.pending, state => {
      state.requestStatus = Status.LOADING
    })
    builder.addCase(logOutUser.fulfilled, (state, { payload }) => {
      state.requestStatus = Status.SUCCEEDED
      if (payload.status === HttpStatuses.OK) {
        state.userInfo = emptyUserData
        state.loggedIn = false
        state.requestError = ''
        state.requestErrorCode = undefined
      } else {
        const message = getHttpStatusMessage(payload.status)
        state.requestError = `Error: ${message}`
        state.requestErrorCode = payload.status
      }
    })
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.requestStatus = Status.FAILED
      const errorMessage = action.error.message
        ? action.error.message
        : 'Error: Failed request'
      state.requestError = errorMessage
      state.requestErrorCode = undefined
    })
    builder.addCase(modifyUserInformation.fulfilled, (state, { payload }) => {
      if (payload.status === HttpStatuses.OK) {
        state.requestStatus = Status.SUCCEEDED
        state.userInfo.pictureUrlProfile = payload.result.pictureUrlProfile
      } else {
        state.requestStatus = Status.FAILED
      }
    })
  },
})

export const {
  clearRequestError,
  forceLogOut,
  oauthRequestError,
} = authSlice.actions
export const selectAuthInfo = ({ auth }: StoreState): Authentication => auth
export default authSlice.reducer
