import eventsReducer, {
  createEvent,
  fetchEvents,
  loadEvents,
  modifyEvent,
  MoreEvents,
  noMoreEvents,
  removeEvent,
} from '../redux/eventsSlice'
import { HttpStatuses, Status } from '../redux/types'
import { mockEventData, mockEventsData, mockErrorData } from '../test/mock-data'

const fakeEventsData = mockEventsData
const fakeEvent = mockEventData

const initialState = {
  events: {
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
    value: [],
  },
  error: {
    code: '',
    message: '',
  },
  hasMore: true,
  status: Status.IDLE,
}

describe('Using the Events slice Reducer', () => {
  it('Handling the initial state', () => {
    expect(eventsReducer(undefined, { type: 'events' })).toEqual(initialState)
  })

  it('Handling MoreEvents', () => {
    const MoreEventsResponse = eventsReducer(initialState, {
      type: MoreEvents.type,
    })
    expect(MoreEventsResponse).toEqual({ ...initialState, hasMore: true })
  })

  it('Handling noMoreEvents', () => {
    const MoreEventsResponse = eventsReducer(initialState, {
      type: noMoreEvents.type,
    })
    expect(MoreEventsResponse).toEqual({ ...initialState, hasMore: false })
  })
})

describe('Using the fetchEvents extra reducer', () => {
  it('Handling fetchEvents FULFILLED', () => {
    const fetchEventsFulfilledResponse = eventsReducer(initialState, {
      payload: fakeEventsData,
      type: fetchEvents.fulfilled.type,
    })

    expect(fetchEventsFulfilledResponse).toEqual({
      ...initialState,
      hasMore: true,
      events: fakeEventsData,
      status: Status.SUCCEEDED,
    })
  })

  it('Handling fetchEvents REJECTED', () => {
    const fetchEventsRejectedResponse = eventsReducer(initialState, {
      payload: mockErrorData,
      type: fetchEvents.rejected.type,
    })

    expect(fetchEventsRejectedResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
    })
  })
})

describe('Using the loadEvents extra reducer', () => {
  it('Handling loadEvents PENDING', () => {
    const loadEventsFulfilledResponse = eventsReducer(initialState, {
      payload: fakeEventsData,
      type: loadEvents.pending.type,
    })

    expect(loadEventsFulfilledResponse).toEqual({
      ...initialState,
      status: Status.LOADING,
    })
  })

  it('Handling loadEvents FULFILLED', () => {
    const loadEventsFulfilledResponse = eventsReducer(initialState, {
      payload: fakeEventsData,
      type: loadEvents.fulfilled.type,
    })

    expect(loadEventsFulfilledResponse).toEqual({
      ...initialState,
      events: {
        ...initialState.events,
        value: fakeEventsData.value,
      },
      status: Status.SUCCEEDED,
    })
  })
})

describe('Using the createEvent extra reducer', () => {
  it('Handling createEvent FULFILLED', () => {
    const createEventFulfilledResponse = eventsReducer(initialState, {
      payload: fakeEvent,
      type: createEvent.fulfilled.type,
    })

    expect(createEventFulfilledResponse).toEqual({
      ...initialState,
      events: {
        ...initialState.events,
        value: [fakeEvent],
      },
      status: Status.SUCCEEDED,
    })
  })
})

describe('Using the modifyEvent extra reducer', () => {
  it('Handling modifyEvent FULFILLED', () => {
    let fakeUpdatedEvent = { ...fakeEvent }
    fakeUpdatedEvent.name = 'Updated event name'
    fakeUpdatedEvent.description = 'Updated event description'
    const [, ...remainingEvents] = fakeEventsData.value

    const modifyEventFulfilledResponse = eventsReducer(
      {
        ...initialState,
        events: fakeEventsData,
      },
      {
        payload: fakeUpdatedEvent,
        type: modifyEvent.fulfilled.type,
      },
    )

    expect(modifyEventFulfilledResponse).toEqual({
      ...initialState,
      events: {
        ...fakeEventsData,
        value: [fakeEvent, ...remainingEvents],
      },
      status: Status.SUCCEEDED,
    })
  })
})

describe('Using the removeEvent extra reducer', () => {
  it('Handling removeEvent PENDING', () => {
    const removeEventPendingResponse = eventsReducer(initialState, {
      type: removeEvent.pending.type,
    })

    expect(removeEventPendingResponse).toEqual({
      ...initialState,
      status: Status.LOADING,
    })
  })

  it('Handling removeEvent FULFILLED', () => {
    const removeEventFulfilledResponse = eventsReducer(
      {
        ...initialState,
        events: fakeEventsData,
      },
      {
        payload: {
          status: HttpStatuses.NO_CONTENT,
          eventId: fakeEvent.id,
        },
        type: removeEvent.fulfilled.type,
      },
    )

    const [, ...remainingEvents] = fakeEventsData.value

    expect(removeEventFulfilledResponse).toEqual({
      ...initialState,
      events: {
        ...fakeEventsData,
        value: [...remainingEvents],
      },
      status: Status.SUCCEEDED,
    })
  })

  it('Handling removeEvent FULFILLED with an error', () => {
    const removeEventFulfilledResponse = eventsReducer(initialState, {
      payload: {
        status: HttpStatuses.INTERNAL_SERVER_ERROR,
        eventId: fakeEvent.id,
      },
      type: removeEvent.fulfilled.type,
    })

    expect(removeEventFulfilledResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
    })
  })

  it('Handling removeEvent REJECTED', () => {
    const removeEventFulfilledResponse = eventsReducer(initialState, {
      type: removeEvent.rejected.type,
    })

    expect(removeEventFulfilledResponse).toEqual({
      ...initialState,
      status: Status.FAILED,
    })
  })
})
