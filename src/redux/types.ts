export enum Status {
  IDLE = 'idle',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  LOADING = 'loading',
}

export enum HttpStatuses {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum UserFriendlyMessages {
  INTERNAL_SERVER_ERROR = 'We are experiencing some issues, try again later',
  WRONG_USERNAME_PASSWORD = 'Wrong username or password',
}

export function getHttpStatusMessage(httpStatusCode: number): string {
  let httpStatusMessage = ''
  switch (httpStatusCode) {
    case HttpStatuses.OK:
      httpStatusMessage = 'Ok'
      break
    case HttpStatuses.CREATED:
      httpStatusMessage = 'Created'
      break
    case HttpStatuses.NO_CONTENT:
      httpStatusMessage = 'No content found'
      break
    case HttpStatuses.BAD_REQUEST:
      httpStatusMessage = 'Bad request'
      break
    case HttpStatuses.UNAUTHORIZED:
      httpStatusMessage = 'Unauthorized'
      break
    case HttpStatuses.FORBIDDEN:
      httpStatusMessage = 'Forbidden'
      break
    case HttpStatuses.NOT_FOUND:
      httpStatusMessage = 'Not found'
      break
    case HttpStatuses.INTERNAL_SERVER_ERROR:
      httpStatusMessage = 'Internal server Error'
      break
    default:
      break
  }
  return httpStatusMessage
}

export interface CreateEvent {
  category: string
  description: string
  endDate: string
  imageUrl: string
  isLinkVisible: boolean
  meetingLink: string
  name: string
  startDate: string
  speaker: string
  summary: string
  tags: string
  token?: string
}

export interface CreateEventProps {
  token?: string
}

export interface Event {
  capacity: number
  category: string
  description: string
  endDate: string
  id: string
  imageUrl: string
  isLinkVisible?: boolean
  meetingLink?: string
  name: string
  speaker: string
  startDate: string
  tags: string
  status: EventStatus
  summary: string
  createdBy: number
  conferenceId?: string
}

export enum ModalTypes {
  ConfirmDeleteModalValues = 'confirmDelete',
  DeleteSucceededModalValues = 'deleteSucceeded',
  EventIsFullModalValues = 'eventIsFull',
  ConfirmUpdateModalValues = 'confirmUpdate',
  UpdateSucceededModalValues = 'updateSucceeded',
  SessionExpiredModal = 'sessionExpired',
  ConfirmUpdateConferenceModalValues = 'confirmConferenceUpdate',
  UpdateConferenceSucceededModalValues = 'updateConferenceSucceeded',
  SendInvitation = 'sendInvitation',
}
export interface UserCredentials {
  email: string
  pictureUrlProfile: string
  token?: string | null
  username: string
  userId?: number
}

export interface UserAccessInfo {
  email?: string
  password: string
  username: string
}

export interface UserInformation {
  facebookUrlProfile: string
  firstName: string
  lastName: string
  linkedinUrlProfile: string
  pictureUrlProfile: string
  twitterUrlProfile: string
  userId: number
  youtubeUrlProfile: string
}

export interface InitialState {
  error: string | null
  events: EventsWrapper
  hasMore: boolean
  status: string
}

export interface UpdateEvent {
  capacity: number
  category: string
  conferenceId?: string
  createdBy: number
  description: string
  endDate: string
  id: string
  imageUrl: string
  isLinkVisible?: boolean
  meetingLink?: string
  name: string
  speaker: string
  startDate: string
  status: EventStatus
  summary: string
  tags: string
}

export enum EventStatus {
  CANCELED = 'Canceled',
  DRAFT = 'Draft',
  FINISHED = 'Finished',
  PUBLISHED = 'Published',
}

export interface EventsWrapper {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalRecords: number
  value: Event[]
}

export interface EventDeleteData {
  eventId?: string
  token?: string
}
export interface Filter {
  category?: string
  createdBy?: number
  conferenceId?: string
  description?: string
  endDate?: string
  name?: string
  orderBy?: string
  skip?: number
  speaker?: string
  startDate?: string
  status?: string
  summary?: string
  tags?: string
  top?: number
  userEvents?: string
}

export interface ConferencesFilter {
  createdby?: number
  status?: string
}
export interface GeneralEventStatistics {
  allEventsCount: number
  allActiveEventsCount: number
}

export interface Conference {
  bannerUrl: string
  createdBy: number
  conferenceName: string
  description: string
  endDate: string
  eventsId: string[]
  id?: string
  imageUrl: string
  logoUrl: string
  startDate: string
  status: EventStatus
}

export interface CreateConference {
  bannerUrl: string
  conferenceName: string
  description: string
  endDate: string
  eventsId: string[]
  imageUrl: string
  logoUrl: string
  startDate: string
  token?: string
  status: EventStatus
}

export interface UpdateConference {
  bannerUrl: string
  conferenceName: string
  createdBy: number
  description: string
  endDate: string
  eventsId: string[]
  imageUrl: string
  logoUrl: string
  status: EventStatus
  startDate: string
}
export interface ConferenceUpdateData {
  body: UpdateConference
  conferenceId?: string
  token?: string
}
export interface EventUpdateData {
  body: UpdateEvent
  eventId?: string
  token?: string
}

export interface CreateRegistration {
  userId?: number
}

export interface Registration {
  eventId: string
  id: string
  userId: number
}

export interface ErrorType {
  code: string
  message: string
}

export interface UserInformationUpdateData {
  body: UserInformation
  token: string | undefined
  userId: number
}
export interface AddRemoveConferenceContent {
  actionType: string
  eventsArray: string[]
}
export interface AddRemoveEvent {
  conferenceId?: string
  content: AddRemoveConferenceContent
  token?: string
}
interface UserPatchRequest {
  field: string
  password: string
  value: string
}

export interface UserPatchRequestData {
  body: UserPatchRequest
  token: string | undefined
  userId: number
}

export enum UserFields {
  EMAIL = 'email',
  NAME = 'user_name',
  PASSWORD = 'user_password',
}

export interface NotificationDBObject {
  _id: string
  _rev: string
  Event: {
    Id: string
    Name: string
    StartDate: string
    Summary: string
  }
  IsNew: boolean
  User: {
    Email: string
    Id: string
    Name: string
  }
}

export interface NotificationState {
  isNew: number
  notifications: NotificationDBObject[]
  update: boolean
}

export interface NotificationProps {
  message: string
  obj: NotificationDBObject
  read: boolean
}

export interface GetNotificationsProps {
  email: string
  token: string
}

export interface GetNotificationsResponse {
  count: number
  notifications: NotificationDBObject[]
}

export interface UpdateNotificationProps {
  body: NotificationDBObject
  token: string
}

export interface UpdateNotificationsProps {
  notifications: NotificationDBObject[]
  token: string
}

export interface EventByIdData {
  id: string
  token?: string
}

export interface InvitationData {
  eventId: string
  email: string
  token: string
}

export interface Users {
  email: string
  eventId: string
  id: string
  name: string
  picture: string
  userId: number
}
