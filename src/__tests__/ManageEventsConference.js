import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import ManageEventsConference from '../components/ManageEventsConference'

import store from '../redux/store'

const mockConferenceData = {
  bannerUrl: 'testBanner',
  conferenceName: 'This is a conference title for a conference test',
  description:
    'This is a very very very very very long description for a conference test',
  endDate: '2021-01-19T15:43',
  eventsId: [
    '6008a149b90ed8221399f04f',
    '5fff555e547f8ac8c59e6758',
    '60087995b90ed8221399f04e',
  ],
  id: '60089926bb5f639056b333b1',
  imageUrl: 'string',
  logoUrl: 'string',
  startDate: '2021-01-18T15:43',
  status: 'Draft',
  createdBy: 1,
}

const mockEventsData = [
  {
    category: 'concert,music,live,rick',
    conferenceId: '60089926bb5f639056b333b1',
    createdBy: 1,
    description: 'Rick James last virtual concert',
    endDate: '2021-01-23T22:00:00Z',
    id: '6008a149b90ed8221399f04f',
    imageUrl:
      'https://res.cloudinary.com/dyco2mauj/image/upload/v1611178309/userImages/r4mzpnnbxytb3au9x0aq.jpg',
    name: 'Rick James last virtual concert',
    speaker: 'Rick James',
    startDate: '2021-01-23T21:27:00Z',
    status: 'Draft',
    summary: 'Rick James virtual concert',
    tags: 'concert,live,rick james',
  },
  {
    category: 'concert,music,live,rick',
    conferenceId: '60089926bb5f639056b333b1',
    createdBy: 1,
    description: 'Rick James last virtual concert',
    endDate: '2021-01-23T22:00:00Z',
    id: '5fff555e547f8ac8c59e6758',
    imageUrl:
      'https://res.cloudinary.com/dyco2mauj/image/upload/v1611178309/userImages/r4mzpnnbxytb3au9x0aq.jpg',
    name: 'Rick James last virtual concert',
    speaker: 'Rick James',
    startDate: '2021-01-23T21:27:00Z',
    status: 'Draft',
    summary: 'Rick James virtual concert',
    tags: 'concert,live,rick james',
  },
  {
    category: 'concert,music,live,rick',
    conferenceId: '60089926bb5f639056b333b1',
    createdBy: 1,
    description: 'Rick James last virtual concert',
    endDate: '2021-01-23T22:00:00Z',
    id: '60087995b90ed8221399f04e',
    imageUrl:
      'https://res.cloudinary.com/dyco2mauj/image/upload/v1611178309/userImages/r4mzpnnbxytb3au9x0aq.jpg',
    name: 'Rick James last virtual concert',
    speaker: 'Rick James',
    startDate: '2021-01-23T21:27:00Z',
    status: 'Draft',
    summary: 'Rick James virtual concert',
    tags: 'concert,live,rick james',
  },
]

test(' Table is rendering', () => {
  render(
    <Provider store={store}>
      <ManageEventsConference
        eventList={mockEventsData}
        conference={mockConferenceData}
      />
    </Provider>,
  )
})
