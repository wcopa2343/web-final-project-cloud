import userReducer, {
  fetchById,
  modifyUserInformation,
  modifyUserPassword,
} from '../redux/userSlice'
import { HttpStatuses, Status } from '../redux/types'
import { mockUserData, mockErrorData } from '../test/mock-data'

const mockUserErrorData = mockErrorData

const initialState = {
  error: {
    code: '',
    message: '',
  },
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
  status: Status.IDLE,
  statusCode: undefined,
}

describe('Using the User slice', () => {
  it('Handling the initial state', () => {
    expect(userReducer(undefined, { type: 'user' })).toEqual(initialState)
  })
})

describe('Using the fetchById extra reducer', () => {
  it('Handling fetchById FULFILLED', () => {
    const fetchByIdFulfilledResponse = userReducer(initialState, {
      payload: mockUserData,
      type: fetchById.fulfilled.type,
    })

    expect(fetchByIdFulfilledResponse).toEqual({
      ...initialState,
      userinformation: {
        ...mockUserData,
      },
      status: Status.SUCCEEDED,
    })
  })

  it('Handling fetchById REJECTED', () => {
    const fetchByIdRejectedResponse = userReducer(initialState, {
      payload: mockUserErrorData,
      type: fetchById.rejected.type,
    })

    expect(fetchByIdRejectedResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
    })
  })
})

describe('Using the modifyUserInformation extra reducer', () => {
  it('Handling modifyUserInformation PENDING', () => {
    const modifyUserInfoFulfilledResponse = userReducer(initialState, {
      type: modifyUserInformation.pending.type,
    })

    expect(modifyUserInfoFulfilledResponse).toEqual({
      ...initialState,
      status: Status.LOADING,
    })
  })

  it('Handling modifyUserInformation FULFILLED', () => {
    const modifyUserInfoFulfilledResponse = userReducer(initialState, {
      payload: {
        result: mockUserData,
        status: HttpStatuses.OK,
      },
      type: modifyUserInformation.fulfilled.type,
    })

    expect(modifyUserInfoFulfilledResponse).toEqual({
      ...initialState,
      status: Status.SUCCEEDED,
      userinformation: {
        ...mockUserData,
      },
    })
  })

  it('Handling modifyUserInformation FULFILLED with an error response', () => {
    const modifyUserInfoFulfilledResponse = userReducer(initialState, {
      payload: {
        result: mockUserData,
        status: HttpStatuses.INTERNAL_SERVER_ERROR,
      },
      type: modifyUserInformation.fulfilled.type,
    })

    expect(modifyUserInfoFulfilledResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
    })
  })

  it('Handling modifyUserInformation REJECTED', () => {
    const modifyUserInfoRejectedResponse = userReducer(initialState, {
      payload: mockUserErrorData,
      type: modifyUserInformation.rejected.type,
    })

    expect(modifyUserInfoRejectedResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
    })
  })
})

describe('Using the modifyUserPassword extra reducer', () => {
  it('Handling modifyUserPassword PENDING', () => {
    const modifyPasswordPendingResponse = userReducer(initialState, {
      type: modifyUserPassword.pending.type,
    })

    expect(modifyPasswordPendingResponse).toEqual({
      ...initialState,
    })
  })

  it('Handling modifyUserPassword FULFILLED', () => {
    const modifyPasswordFulfilledResponse = userReducer(initialState, {
      payload: {
        status: HttpStatuses.NO_CONTENT,
      },
      type: modifyUserPassword.fulfilled.type,
    })

    expect(modifyPasswordFulfilledResponse).toEqual({
      ...initialState,
      status: Status.SUCCEEDED,
      statusCode: HttpStatuses.NO_CONTENT,
    })
  })

  it('Handling modifyUserPassword FULFILLED with a password error', () => {
    const modifyPasswordFulfilledResponse = userReducer(initialState, {
      payload: {
        status: HttpStatuses.UNPROCESSABLE_ENTITY,
      },
      type: modifyUserPassword.fulfilled.type,
    })

    expect(modifyPasswordFulfilledResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
      statusCode: HttpStatuses.UNPROCESSABLE_ENTITY,
    })
  })

  it('Handling modifyUserPassword FULFILLED with another error', () => {
    const modifyPasswordFulfilledResponse = userReducer(initialState, {
      payload: {
        status: HttpStatuses.INTERNAL_SERVER_ERROR,
      },
      type: modifyUserPassword.fulfilled.type,
    })

    expect(modifyPasswordFulfilledResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
      statusCode: HttpStatuses.INTERNAL_SERVER_ERROR,
    })
  })
})
