import authentication, {
  authUser,
  createUser,
  clearRequestError,
  forceLogOut,
  logOutUser,
} from '../redux/authSlice'
import { HttpStatuses, Status, UserFriendlyMessages } from '../redux/types'
import { modifyUserInformation } from '../redux/userSlice'
import {
  mockAuthenticationData,
  mockErrorData,
  mockUnauthorizedData,
} from '../test/mock-data'

const mockAuthenticationErrorData = mockErrorData

const emptyUserData = {
  email: '',
  pictureUrlProfile: '',
  token: '',
  userId: undefined,
  username: '',
}

const initialState = {
  loggedIn: false,
  requestError: '',
  requestErrorCode: undefined,
  requestStatus: Status.IDLE,
  userInfo: emptyUserData,
}

describe('Using the actions from the Authentication Reducer', () => {
  it('Handling the initial state', () => {
    expect(authentication(undefined, { type: 'authentication' })).toEqual(
      initialState,
    )
  })

  it('Handling Forcing Log out', () => {
    const forceLogOutResponse = authentication(initialState, {
      type: forceLogOut.type,
    })
    expect(forceLogOutResponse).toEqual({ ...initialState, loggedIn: false })
  })

  it('Handling Clearing the Request Error', () => {
    const ClearRequestErrorResponse = authentication(initialState, {
      type: clearRequestError.type,
    })
    expect(ClearRequestErrorResponse).toEqual({
      ...initialState,
      requestError: '',
      requestErrorCode: undefined,
      requestStatus: Status.IDLE,
    })
  })
})

describe('Using the Authentication extra reducer ', () => {
  it('Handling Authenticate user FULFILLED', () => {
    const AuthenticationFulfilledResponse = authentication(initialState, {
      payload: {
        result: mockAuthenticationData,
        status: HttpStatuses.OK,
      },
      type: authUser.fulfilled.type,
    })
    const { userName: username, ...rest } = mockAuthenticationData
    expect(AuthenticationFulfilledResponse).toEqual({
      ...initialState,
      userInfo: {
        ...rest,
        username,
      },
      loggedIn: true,
      requestStatus: Status.SUCCEEDED,
    })
  })

  it('Handling Authenticate user FULFILLED with an Unauthorized response', () => {
    const AuthenticationFulfilledResponse = authentication(initialState, {
      payload: {
        result: mockUnauthorizedData,
        status: HttpStatuses.UNAUTHORIZED,
      },
      type: authUser.fulfilled.type,
    })

    expect(AuthenticationFulfilledResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestError: UserFriendlyMessages.WRONG_USERNAME_PASSWORD,
      requestErrorCode: HttpStatuses.UNAUTHORIZED,
      requestStatus: Status.SUCCEEDED,
    })
  })

  it('Handling Authenticate user FULFILLED with an error Response', () => {
    const AuthenticationFulfilledResponse = authentication(initialState, {
      payload: {
        result: mockAuthenticationErrorData,
        status: HttpStatuses.INTERNAL_SERVER_ERROR,
      },
      type: authUser.fulfilled.type,
    })
    expect(AuthenticationFulfilledResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestError: UserFriendlyMessages.INTERNAL_SERVER_ERROR,
      requestErrorCode: HttpStatuses.INTERNAL_SERVER_ERROR,
      requestStatus: Status.SUCCEEDED,
    })
  })

  it('Handling Authenticate user REJECTED', () => {
    const AuthenticationRejectedResponse = authentication(initialState, {
      payload: mockAuthenticationErrorData,
      type: authUser.rejected.type,
    })
    expect(AuthenticationRejectedResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestError: UserFriendlyMessages.INTERNAL_SERVER_ERROR,
      requestStatus: Status.FAILED,
    })
  })
})

describe('Using the User Creation extra reducer ', () => {
  it('Handling createUser FULFILLED', () => {
    const CreateUserFulfilledResponse = authentication(initialState, {
      payload: {
        result: mockAuthenticationData,
        status: HttpStatuses.CREATED,
      },
      type: createUser.fulfilled.type,
    })
    const { userName: username, ...rest } = mockAuthenticationData
    expect(CreateUserFulfilledResponse).toEqual({
      ...initialState,
      userInfo: {
        ...rest,
        username,
      },
      loggedIn: true,
      requestStatus: Status.SUCCEEDED,
    })
  })

  it('Handling createUser FULFILLED with an error Response', () => {
    const CreateUserFulfilledResponse = authentication(initialState, {
      payload: {
        result: mockAuthenticationErrorData,
        status: HttpStatuses.INTERNAL_SERVER_ERROR,
      },
      type: createUser.fulfilled.type,
    })
    expect(CreateUserFulfilledResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestError: UserFriendlyMessages.INTERNAL_SERVER_ERROR,
      requestErrorCode: HttpStatuses.INTERNAL_SERVER_ERROR,
      requestStatus: Status.SUCCEEDED,
    })
  })

  it('Handling crateUser FULFILLED with an Conflict Response', () => {
    const CreateUserFulfilledResponse = authentication(initialState, {
      payload: {
        result: mockAuthenticationErrorData,
        status: HttpStatuses.CONFLICT,
      },
      type: createUser.fulfilled.type,
    })
    expect(CreateUserFulfilledResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestError: 'Authentication Error',
      requestErrorCode: HttpStatuses.CONFLICT,
      requestStatus: Status.SUCCEEDED,
    })
  })

  it('Handling crateUser REJECTED', () => {
    const CreateUserFulfilledResponse = authentication(initialState, {
      payload: mockAuthenticationErrorData,
      type: createUser.rejected.type,
    })
    expect(CreateUserFulfilledResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestError: UserFriendlyMessages.INTERNAL_SERVER_ERROR,
      requestStatus: Status.FAILED,
    })
  })
})

describe('Using the User Logout extra reducer ', () => {
  it('Handling logOutUser FULFILLED', () => {
    const logoutUserFulfilledResponse = authentication(initialState, {
      payload: {
        status: HttpStatuses.OK,
      },
      type: logOutUser.fulfilled.type,
    })
    const { userName: username, ...rest } = mockAuthenticationData
    expect(logoutUserFulfilledResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestStatus: Status.SUCCEEDED,
    })
  })

  it('Handling logOutUser FULFILLED with an error Response', () => {
    const logoutUserFulfilledResponse = authentication(initialState, {
      payload: {
        status: HttpStatuses.INTERNAL_SERVER_ERROR,
      },
      type: logOutUser.fulfilled.type,
    })
    expect(logoutUserFulfilledResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestError: 'Error: Internal server Error',
      requestErrorCode: HttpStatuses.INTERNAL_SERVER_ERROR,
      requestStatus: Status.SUCCEEDED,
    })
  })

  it('Handling logOutUser REJECTED', () => {
    const { error } = mockAuthenticationErrorData
    const logoutUserFulfilledResponse = authentication(initialState, {
      error,
      type: logOutUser.rejected.type,
    })
    expect(logoutUserFulfilledResponse).toEqual({
      ...initialState,
      loggedIn: false,
      requestError: error.message,
      requestStatus: Status.FAILED,
    })
  })
})

describe('Using the modifyUserInformation extra reducer ', () => {
  it('Handling modifyUserInformation FULFILLED', () => {
    const modifyUserInfoFulfilledResponse = authentication(initialState, {
      payload: {
        result: mockAuthenticationData,
        status: HttpStatuses.OK,
      },
      type: modifyUserInformation.fulfilled.type,
    })

    expect(modifyUserInfoFulfilledResponse).toEqual({
      ...initialState,
      requestStatus: Status.SUCCEEDED,
      userInfo: {
        ...emptyUserData,
        pictureUrlProfile: mockAuthenticationData.pictureUrlProfile,
      },
    })
  })

  it('Handling modifyUserInformation FULFILLED with an error', () => {
    const modifyUserInfoFulfilledResponse = authentication(initialState, {
      payload: {
        result: mockAuthenticationErrorData,
        status: HttpStatuses.INTERNAL_SERVER_ERROR,
      },
      type: modifyUserInformation.fulfilled.type,
    })

    expect(modifyUserInfoFulfilledResponse).toEqual({
      ...initialState,
      requestStatus: Status.FAILED,
    })
  })
})
