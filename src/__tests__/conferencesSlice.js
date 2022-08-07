import conferencesReducer, {
  createNewConference,
  fetchConferences,
} from '../redux/conferencesSlice'

import { Status } from '../redux/types'
import { mockConferenceData, mockConferencesData } from '../test/mock-data'

const fakeConference = mockConferenceData
const fakeConferencesData = mockConferencesData

const initialState = {
  conferences: [],
  error: {
    code: '',
    message: '',
  },
  status: Status.IDLE,
}
describe('Using the conferences slice reducer', () => {
  it('Handling the initial state', () => {
    expect(conferencesReducer(undefined, { type: 'conferences' })).toEqual(
      initialState,
    )
  })
})
describe('Using fetchConferences extra reducers', () => {
  it('Handling fetchConferences PENDING', () => {
    const fetchConferencesPendingResponse = conferencesReducer(initialState, {
      type: fetchConferences.pending.type,
    })
    expect(fetchConferencesPendingResponse).toEqual({
      ...initialState,
      status: Status.LOADING,
    })
  })
  it('Handling fetchConferences FULFILLED', () => {
    const fetchConferencesFulfilledResponse = conferencesReducer(initialState, {
      type: fetchConferences.fulfilled.type,
      payload: fakeConferencesData,
    })
    expect(fetchConferencesFulfilledResponse).toEqual({
      ...initialState,
      conferences: fakeConferencesData,
      status: Status.SUCCEEDED,
    })
  })
  it('Handling fetchConferences FAILED', () => {
    const fetchConferencesFailedResponse = conferencesReducer(initialState, {
      type: fetchConferences.rejected.type,
    })
    expect(fetchConferencesFailedResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
    })
  })
})
describe('Using  createNewconferences slice reducer', () => {
  it('Handling createNewConference', () => {
    const createNewConferencesSucceededResponse = conferencesReducer(
      initialState,
      {
        type: createNewConference.fulfilled.type,
        payload: fakeConference,
      },
    )
    expect(createNewConferencesSucceededResponse).toEqual({
      ...initialState,
      conferences: [fakeConference],
      status: Status.SUCCEEDED,
    })
  })
})
