import {
  Conference,
  Event,
  GeneralEventStatistics,
  Status,
  UserInformation,
  Users,
} from './types'

export interface Error {
  code: string
  message: string
}

export interface userInfo {
  email: string
  pictureUrlProfile: string
  token?: string
  username: string
  userId?: number
}

export interface Authentication {
  loggedIn: boolean
  requestError?: string
  requestErrorCode?: number
  requestStatus: string
  userInfo: userInfo
}

export interface UserInformationReducer {
  error: Error
  status: string
  statusCode: number | undefined
  userinformation: UserInformation
}

export interface ConferencesReducer {
  conferences: Conference[]
  error: Error
  status: string
}

export interface ConferenceReducer {
  conference: Conference
  error: Error
  patchStatus: string
  status: string
}

export interface EventReducer {
  error: Error
  event: Event
  status: string
}
export interface EventStatisticsReducer {
  error: Error
  generalEventStatistics: GeneralEventStatistics
  status: string
}
export interface Wrapper {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
  value: Event[]
}

export interface EventsReducer {
  error: Error
  events: Wrapper
  hasMore: boolean
  status: string
}

export interface Registration {
  error: Error
  registration?: boolean
  status: Status
}

export interface Registrations {
  count: number
  error: Error
  registrationList: Users[]
  status: Status
}

export interface StoreState {
  auth: Authentication
  conference: ConferenceReducer
  conferences: ConferencesReducer
  event: EventReducer
  events: EventsReducer
  eventStatistics: EventStatisticsReducer
  registration: Registration
  registrations: Registrations
  user: UserInformationReducer
}
