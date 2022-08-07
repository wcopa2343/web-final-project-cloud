import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { Values } from '../components/CreateConferenceForm'
import { UpdateValues } from '../components/UpdateConferenceForm'
import {
  createConference,
  getConferences,
  updateConference,
} from '../utils/conferenceClient'
import { createImageUrl } from '../utils/imageClient'
import { ConferencesReducer, StoreState } from './stateTypes'
import {
  ConferencesFilter,
  ConferenceUpdateData,
  CreateConference,
  EventStatus,
  Status,
} from './types'

const initialState: ConferencesReducer = {
  conferences: [],
  error: {
    code: '',
    message: '',
  },
  status: Status.IDLE,
}

interface CreateProps {
  banner: File
  image: File
  logo: File
  token?: string
  values: Values
}

interface UpdateProps {
  banner?: File
  bannerUrl: string
  conferenceId?: string
  createdBy: number
  image?: File
  imageUrl: string
  logo?: File
  logoUrl: string
  token?: string
  values: UpdateValues
}

export const fetchConferences = createAsyncThunk(
  'conferences/fetchConferences',
  async (params?: ConferencesFilter) => {
    return await getConferences(params)
  },
)

export const createNewConference = createAsyncThunk(
  'conferences/createNewConference',
  async ({ banner, image, logo, values, token }: CreateProps) => {
    const newBanner = await createImageUrl(banner)
    const newImage = await createImageUrl(image)
    const newLogo = await createImageUrl(logo)

    const NewConference: CreateConference = {
      ...values,
      bannerUrl: newBanner,
      endDate: dayjs(values.endDate).toISOString(),
      eventsId: [],
      imageUrl: newImage,
      logoUrl: newLogo,
      startDate: dayjs(values.startDate).toISOString(),
      status: EventStatus.DRAFT,
      token: token,
    }

    return await createConference(NewConference)
  },
)

export const updateExistingConference = createAsyncThunk(
  'conferences/updateConference',
  async ({
    banner,
    bannerUrl,
    conferenceId,
    createdBy,
    image,
    imageUrl,
    logo,
    logoUrl,
    token,
    values,
  }: UpdateProps) => {
    let newBanner = bannerUrl
    let newImage = imageUrl
    let newLogo = logoUrl
    if (banner !== undefined) {
      newBanner = await createImageUrl(banner)
    }
    if (image !== undefined) {
      newImage = await createImageUrl(image)
    }
    if (logo !== undefined) {
      newLogo = await createImageUrl(logo)
    }
    const data: ConferenceUpdateData = {
      body: {
        bannerUrl: newBanner,
        conferenceName: values.conferenceName,
        createdBy: createdBy,
        description: values.description,
        endDate: dayjs(values.endDate).toISOString(),
        eventsId: values.eventsId,
        imageUrl: newImage,
        logoUrl: newLogo,
        startDate: dayjs(values.startDate).toISOString(),
        status: values.status,
      },
      conferenceId: conferenceId,
      token: token,
    }
    return await updateConference(data)
  },
)

export const conferencesSlice = createSlice({
  name: 'conferences',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchConferences.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(fetchConferences.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.conferences = action.payload
    })
    builder.addCase(fetchConferences.rejected, state => {
      state.status = Status.FAILED
    })
    builder.addCase(createNewConference.fulfilled, (state, action) => {
      state.conferences.push(action.payload)
      state.status = Status.SUCCEEDED
    })
  },
})

export const selectAllConferences = ({
  conferences,
}: StoreState): ConferencesReducer => conferences
export default conferencesSlice.reducer
