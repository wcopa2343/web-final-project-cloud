import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  getUserById,
  patchUserInformation,
  patchUserPassword,
} from '../utils/authClient'
import toast from '../utils/toast'
import {
  HttpStatuses,
  Status,
  UserFriendlyMessages,
  UserInformationUpdateData,
  UserPatchRequestData,
} from './types'
import { StoreState, UserInformationReducer } from './stateTypes'

export const initialState: UserInformationReducer = {
  error: {
    code: '',
    message: '',
  },
  status: Status.IDLE,
  statusCode: undefined,
  userinformation: {
    facebookUrlProfile: '',
    firstName: '',
    lastName: '',
    linkedinUrlProfile: '',
    pictureUrlProfile: '',
    twitterUrlProfile: '',
    userId: 0,
    youtubeUrlProfile: '',
  },
}

export const modifyUserInformation = createAsyncThunk(
  'user/update',
  async (data: UserInformationUpdateData) => {
    return await patchUserInformation(data)
  },
)

export const fetchById = createAsyncThunk(
  'user',
  async (id: number | undefined) => {
    return await getUserById(id)
  },
)

export const modifyUserPassword = createAsyncThunk(
  'user/updatePassword',
  async (data: UserPatchRequestData) => {
    return await patchUserPassword(data)
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchById.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchById.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.userinformation = action.payload
    })
    builder.addCase(fetchById.rejected, (state, action) => {
      state.status = Status.FAILED
    })
    builder.addCase(modifyUserInformation.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(modifyUserInformation.fulfilled, (state, { payload }) => {
      if (payload.status === HttpStatuses.OK) {
        state.status = Status.SUCCEEDED
        state.userinformation = payload.result
        toast({ action: 'success', message: 'User information updated' })
      } else {
        state.status = Status.FAILED
        toast({
          action: 'error',
          message: UserFriendlyMessages.INTERNAL_SERVER_ERROR,
        })
      }
    })
    builder.addCase(modifyUserInformation.rejected, state => {
      state.status = Status.FAILED
      toast({
        action: 'error',
        message: UserFriendlyMessages.INTERNAL_SERVER_ERROR,
      })
    })
    builder.addCase(modifyUserPassword.pending, state => {
      state.error.code = ''
      state.error.message = ''
      state.statusCode = undefined
    })
    builder.addCase(modifyUserPassword.fulfilled, (state, { payload }) => {
      state.statusCode = payload.status
      if (payload.status === HttpStatuses.NO_CONTENT) {
        state.status = Status.SUCCEEDED
        toast({ action: 'success', message: 'Password updated' })
      } else if (payload.status === HttpStatuses.UNPROCESSABLE_ENTITY) {
        state.status = Status.FAILED
        toast({ action: 'warning', message: 'Current password is incorrect' })
      } else {
        state.status = Status.FAILED
      }
    })
  },
})

export const singleUserInfo = ({ user }: StoreState): UserInformationReducer =>
  user
export default userSlice.reducer
