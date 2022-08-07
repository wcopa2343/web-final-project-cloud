import registration, {
  checkEventRegistrationByUser,
  createRegistration,
  removeRegistration,
} from '../redux/registrationSlice'

import { Status } from '../redux/types'

const initialState = {
  error: {
    code: '',
    message: '',
  },
  registration: undefined,
  status: Status.IDLE,
}

describe('Register to event extra Reducer', () => {
  it('Petition FULFILLED', () => {
    const createRegistrationResponse = registration(initialState, {
      payload: { id: 'fakeId' },
      type: createRegistration.fulfilled.type,
    })

    expect(createRegistrationResponse).toEqual({
      ...initialState,
      registration: true,
      status: Status.SUCCEEDED,
    })
  })

  it('Petition PENDING', () => {
    const createRegistrationResponse = registration(initialState, {
      type: createRegistration.pending.type,
    })

    expect(createRegistrationResponse).toEqual({
      ...initialState,
      status: Status.LOADING,
    })
  })
  it('Petition REJECTED', () => {
    const createRegistrationResponse = registration(initialState, {
      type: createRegistration.rejected.type,
    })

    expect(createRegistrationResponse).toEqual({
      ...initialState,
      registration: false,
      status: Status.FAILED,
    })
  })
})

describe('Remove subscription extra Reducer', () => {
  it('Petition FULFILLED', () => {
    const removeRegistrationResponse = registration(initialState, {
      payload: 204,
      type: removeRegistration.fulfilled.type,
    })

    expect(removeRegistrationResponse).toEqual({
      ...initialState,
      registration: false,
      status: Status.SUCCEEDED,
    })
  })

  it('Petition PENDING', () => {
    const removeRegistrationResponse = registration(initialState, {
      type: removeRegistration.pending.type,
    })

    expect(removeRegistrationResponse).toEqual({
      ...initialState,
      status: Status.LOADING,
    })
  })
  it('Petition REJECTED', () => {
    const removeRegistrationResponse = registration(initialState, {
      type: removeRegistration.rejected.type,
    })

    expect(removeRegistrationResponse).toEqual({
      ...initialState,
      registration: true,
      status: Status.FAILED,
    })
  })
})

describe('checkEventRegistrationByUser  extra Reducer', () => {
  it('Petition FULFILLED is registered', () => {
    const removeRegistrationResponse = registration(initialState, {
      payload: { id: 'fakeId' },
      type: checkEventRegistrationByUser.fulfilled.type,
    })

    expect(removeRegistrationResponse).toEqual({
      ...initialState,
      registration: true,
      status: Status.SUCCEEDED,
    })
  })

  it('Petition FULFILLED is not registered', () => {
    const removeRegistrationResponse = registration(initialState, {
      payload: { id: null },
      type: checkEventRegistrationByUser.fulfilled.type,
    })

    expect(removeRegistrationResponse).toEqual({
      ...initialState,
      registration: false,
      status: Status.SUCCEEDED,
    })
  })

  it('Petition REJECTED', () => {
    const removeRegistrationResponse = registration(initialState, {
      type: checkEventRegistrationByUser.rejected.type,
    })

    expect(removeRegistrationResponse).toEqual({
      ...initialState,
      registration: false,
      status: Status.FAILED,
    })
  })
})
