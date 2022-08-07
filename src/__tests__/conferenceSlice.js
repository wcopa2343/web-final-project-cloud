import conferenceReducer, {
  InsertIntoConference,
  RemoveFromConference,
  fetchConferencesById,
  modifyConference,
} from '../redux/conferenceSlice'

import { EventStatus, HttpStatuses, Status } from '../redux/types'
import { mockConferenceData } from '../test/mock-data'

const fakeConference = mockConferenceData
const fakeEventId = '1'

const initialState = {
  conference: {
    bannerUrl: '',
    conferenceName: '',
    createdBy: 0,
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

describe('Using the conference slice reducer', () => {
  it('Handling the initial state', () => {
    expect(conferenceReducer(undefined, { type: 'conferences' })).toEqual(
      initialState,
    )
  })
})
describe('Using the fetchConference extra reducers', () => {
  it('Handling fetchConferences PENDING', () => {
    const fetchConferencePendingResponse = conferenceReducer(initialState, {
      type: fetchConferencesById.pending.type,
    })
    expect(fetchConferencePendingResponse).toEqual({
      ...initialState,
      status: Status.LOADING,
    })
  })
  it('Handling fetchConference FULFILLED', () => {
    const fetchConferenceFulfilledResponse = conferenceReducer(initialState, {
      type: fetchConferencesById.fulfilled.type,
      payload: fakeConference,
    })
    expect(fetchConferenceFulfilledResponse).toEqual({
      ...initialState,
      conference: fakeConference,
      status: Status.SUCCEEDED,
    })
  })
  it('Handling fetchConference FAILED', () => {
    const fetchConferenceFailedResponse = conferenceReducer(initialState, {
      type: fetchConferencesById.rejected.type,
    })
    expect(fetchConferenceFailedResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
    })
  })
})
describe('Using the modifyConference extra reducers', () => {
  it('Handling modifyConference FULFILLED', () => {
    const modifyConferenceFulfilledResponse = conferenceReducer(initialState, {
      type: modifyConference.fulfilled.type,
      payload: fakeConference,
    })
    expect(modifyConferenceFulfilledResponse).toEqual({
      ...initialState,
      conference: fakeConference,
    })
  })
})
describe('Using the InsertIntoConference extra reducers', () => {
  it('Handling InsertIntoConference LOADING', () => {
    const InsertIntoConferenceLoadingResponse = conferenceReducer(
      initialState,
      {
        type: InsertIntoConference.pending.type,
        payload: fakeConference,
      },
    )
    expect(InsertIntoConferenceLoadingResponse).toEqual({
      ...initialState,
      patchStatus: Status.LOADING,
    })
  })
})
describe('Using the InsertIntoConference extra reducers', () => {
  it('Handling InsertIntoCOnference FAILED', () => {
    const InsertIntoConferenceFailedResponse = conferenceReducer(initialState, {
      type: InsertIntoConference.rejected.type,
      payload: fakeConference,
    })
    expect(InsertIntoConferenceFailedResponse).toEqual({
      ...initialState,
      patchStatus: Status.FAILED,
    })
  })
})
describe('Using the InsertIntoConference extra reducers', () => {
  it('Handling InsertIntoConference FULFILLED', () => {
    const InsertIntoConferenceFulfilledResponse = conferenceReducer(
      initialState,
      {
        type: InsertIntoConference.fulfilled.type,
        payload: { events: [fakeEventId], status: HttpStatuses.NO_CONTENT },
      },
    )
    expect(InsertIntoConferenceFulfilledResponse).toEqual({
      ...initialState,
      conference: {
        ...initialState.conference,
        eventsId: [fakeEventId],
      },
      status: Status.IDLE,
      patchStatus: Status.SUCCEEDED,
    })
  })
})
describe('Using the RemoveFromConference extra reducers', () => {
  it('Handling RemoveFromConference FULFILLED', () => {
    const RemoveFromConferenceFulfilledResponse = conferenceReducer(
      {
        ...initialState,
        conference: {
          ...initialState.conference,
        },
      },
      {
        type: RemoveFromConference.fulfilled.type,
        payload: [fakeEventId],
      },
    )
    expect(RemoveFromConferenceFulfilledResponse).toEqual({
      ...initialState,
      conference: {
        ...initialState.conference,
        eventsId: [],
      },
    })
  })
})
