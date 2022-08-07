export const mockErrorData = {
  error: {
    code: 'InternalServerError',
    message: 'Authentication Error',
  },
}

export const mockUnauthorizedData = {
  error: {
    code: 'Unauthorized',
    message: 'Access is denied due to invalid credentials',
  },
}

export const mockAuthenticationData = {
  email: 'testuser@test.org',
  pictureUrlProfile: 'http://fakeImageUrlForTestUser',
  token: 'thisIsaFakeTokenForTest',
  userId: 41,
  userName: 'testuser',
}

export const mockUserData = {
  creationDate: '2021-01-19T13:34:09',
  email: 'testuser.test@gmail.com',
  facebookUrlProfile: '',
  firstName: '',
  lastLoginDate: '2020-12-11T13:21:01',
  lastName: '',
  linkedinUrlProfile: '',
  password: 'testCodifiedStringPassword',
  pictureUrlProfile:
    'https://www.gravatar.com/avatar/e78bad8e8be883f14188e1e32c62f0bc?d=retro&s=200',
  state: 'Active',
  twitterUrlProfile: '',
  userId: 7,
  userName: 'testuser',
  youtubeUrlProfile: '',
}

export const mockEventsData = {
  pageNumber: 0,
  pageSize: 3,
  value: [
    {
      id: '6008a149b90ed8221399f04f',
      name: 'Rick James last virtual concert',
      description: 'Rick James last virtual concert',
      tags: 'concert,live,rick james',
      status: 'Draft',
      imageUrl:
        'https://res.cloudinary.com/dyco2mauj/image/upload/v1611178309/userImages/r4mzpnnbxytb3au9x0aq.jpg',
      startDate: '2021-01-23T21:27:00Z',
      endDate: '2021-01-23T22:00:00Z',
      speaker: 'Rick James',
      category: 'concert,music,live,rick',
      summary: 'Rick James virtual concert',
      conferenceId: 'none',
      createdBy: 1,
    },
    {
      id: '5fff555e547f8ac8c59e6758',
      name: 'Warcraft 3 convention',
      description:
        'This is the greatest warcraft convention for over world fans',
      tags: 'videogames,warcraft,cosplay,pc',
      status: 'Finished',
      imageUrl:
        'https://res.cloudinary.com/dyco2mauj/image/upload/v1610569053/userImages/djbapj1x3vf7gchcvksa.jpg',
      startDate: '2021-01-20T20:09:00Z',
      endDate: '2021-01-20T20:09:00Z',
      speaker: 'Arthas Menetil',
      category: 'video games,warcraft,convention',
      summary: 'warcraft history\nwarcraft characters\nwarcraft cosplay',
      createdBy: 1,
    },
    {
      id: '60087995b90ed8221399f04e',
      name: 'warcraft live talk with cosplay',
      description: 'Warcraft virtual talk',
      tags: 'warcraft,live,talk',
      status: 'Published',
      imageUrl:
        'https://res.cloudinary.com/dyco2mauj/image/upload/v1611168146/userImages/zpz0zdqt2tdb7gevuph5.png',
      startDate: '2021-01-22T19:00:00Z',
      endDate: '2021-01-22T20:00:00Z',
      speaker: 'Jeffrey Kaplan',
      category: 'talk,warcraft,video games',
      summary: 'a live talk about your favorite game warcraft',
      conferenceId: 'none',
      createdBy: 1,
    },
  ],
  totalPages: 1,
  totalRecords: 3,
}

export const mockEventData = {
  id: '6008a149b90ed8221399f04f',
  name: 'Rick James last virtual concert',
  description: 'Rick James last virtual concert',
  tags: 'concert,live,rick james',
  status: 'Draft',
  imageUrl:
    'https://res.cloudinary.com/dyco2mauj/image/upload/v1611178309/userImages/r4mzpnnbxytb3au9x0aq.jpg',
  startDate: '2021-01-23T21:27:00Z',
  endDate: '2021-01-23T22:00:00Z',
  speaker: 'Rick James',
  category: 'concert,music,live,rick',
  summary: 'Rick James virtual concert',
  conferenceId: 'none',
  createdBy: 1,
}
export const mockConferenceData = {
  bannerUrl: 'testBanner',
  conferenceName: 'This is a conference title for a conference test',
  description:
    'This is a very very very very very long description for a conference test',
  endDate: '2021-01-19T15:43',
  eventsId: ['1', '2'],
  id: '6008a149b90ed8221399f04f',
  imageUrl: 'string',
  logoUrl: 'string',
  startDate: '2021-01-18T15:43',
  status: 'Draft',
}

export const mockConferencesData = {
  pageNumber: 0,
  pageSize: 3,
  value: [
    {
      bannerUrl: 'testBanner',
      conferenceName: 'This is a conference title for a conference test',
      description:
        'This is a very very very very very long description for a conference test',
      endDate: '2021-01-19T15:43',
      eventsId: ['1', '2'],
      id: '6008a149b90ed8221399f04f',
      imageUrl: 'string',
      logoUrl: 'string',
      startDate: '2021-01-18T15:43',
      status: 'Draft',
    },
    {
      bannerUrl: 'testBanner',
      conferenceName: 'This is a conference title for a conference test',
      description:
        'This is a very very very very very long description for a conference test',
      endDate: '2021-01-19T15:43',
      eventsId: ['1', '2'],
      id: 'string',
      imageUrl: 'string',
      logoUrl: 'string',
      startDate: '2021-01-18T15:43',
      status: 'Draft',
    },
    {
      bannerUrl: 'testBanner',
      conferenceName: 'This is a conference title for a conference test',
      description:
        'This is a very very very very very long description for a conference test',
      endDate: '2021-01-19T15:43',
      eventsId: ['1', '2'],
      id: 'string',
      imageUrl: 'string',
      logoUrl: 'string',
      startDate: '2021-01-18T15:43',
      status: 'Draft',
    },
  ],
  totalPages: 1,
  totalRecords: 3,
}
