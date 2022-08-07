import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formik, FormikProvider } from 'formik'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import CheckInput from '../components/common/CheckInput'
import Chip from '../components/common/Chip'

import Circle from '../components/common/Circle'
import ConferenceCard from '../components/common/ConferenceCard'
import ConferenceDisplay from '../components/common/ConferenceDisplay'
import EventCard from '../components/common/EventCard'
import EventFragment from '../components/common/EventFragment'
import ManageNavBar from '../components/common/ManageNavBar'
import OrganizerCard from '../components/common/OrganizerCard'
import ToggleSwitch from '../components/common/ToggleSwitch'
import store from '../redux/store'

test('Circle component is rendering', () => {
  render(
    <Provider store={store}>
      <Circle />
    </Provider>,
  )
})

test('Toggle Switch is rendering', () => {
  render(
    <Provider store={store}>
      <ToggleSwitch />
    </Provider>,
  )
})

test('Event Card is rendering', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <EventCard
          category=""
          description=""
          endDate=""
          id=""
          imageUrl=""
          name=""
          speaker=""
          startDate=""
          status=""
          summary=""
          tags=""
        />
      </Provider>
    </BrowserRouter>,
  )
})

test('Conference Card is rendering', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ConferenceCard
          bannerUrl=""
          conferenceName=""
          description=""
          endDate=""
          id=""
          imageUrl=""
          logoUrl=""
          startDate=""
          eventsId=""
        />
      </Provider>
    </BrowserRouter>,
  )
})

test('Event Fragment is rendering', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <EventFragment
          category=""
          description=""
          endDate=""
          id=""
          imageUrl=""
          name=""
          speaker=""
          startDate=""
          status=""
          summary=""
          tags=""
        />
      </Provider>
    </BrowserRouter>,
  )
})

describe('Displaying ManageNavBar', () => {
  test('Rendering ManageNavBar', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ManageNavBar />
        </BrowserRouter>
      </Provider>,
    )
    const togleNavBar = screen.getByTestId('toggleNavBar')
    userEvent.click(togleNavBar)
  })
})

const MockCheckInput = () => {
  return (
    <Formik>
      <CheckInput color="green" label="testLabel" name="This is a test Name" />
    </Formik>
  )
}

test('CheckInput is rendering', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <FormikProvider>
          <MockCheckInput />
        </FormikProvider>
      </Provider>
    </BrowserRouter>,
  )
})
const removeChip = jest.fn()
const MockChip = () => {
  return (
    <Formik>
      <Chip
        label="testChip"
        id={0}
        name="testChip"
        color=""
        outline={true}
        removeChip={removeChip}
      />
    </Formik>
  )
}
test('Chip is rendering', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <FormikProvider>
          <MockChip />
        </FormikProvider>
      </Provider>
    </BrowserRouter>,
  )
})
test('Remove Chip', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <FormikProvider>
          <MockChip />
        </FormikProvider>
      </Provider>
    </BrowserRouter>,
  )
  const chipButton = screen.getByTestId('chipButton')
  await waitFor(() => {
    userEvent.click(chipButton)
  })
  expect(removeChip).toHaveBeenCalledTimes(1)
})
test('ConferenceDisplay is rendering', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <FormikProvider>
          <ConferenceDisplay
            bannerUrl=""
            conferenceName=""
            endDate=""
            id=""
            logoUrl=""
            startDate=""
          />
        </FormikProvider>
      </Provider>
    </BrowserRouter>,
  )
})

describe('Redirect to', () => {
  test('Organizer Card button redirects to twiiter', async () => {
    render(
      <Provider store={store}>
        <OrganizerCard userId="" />
      </Provider>,
    )
    const twitterButton = screen.getByTestId('twitterUrlHandler')
    await waitFor(() => {
      userEvent.click(twitterButton)
    })
  })
  test('Organizer card button redirects to facebook', async () => {
    render(
      <Provider store={store}>
        <OrganizerCard userId="" />
      </Provider>,
    )
    const facebookButton = screen.getByTestId('facebookUrlHandler')
    await waitFor(() => {
      userEvent.click(facebookButton)
    })
  })
  test('Organizer card button redirects to youtube', async () => {
    render(
      <Provider store={store}>
        <OrganizerCard userId="" />
      </Provider>,
    )
    const youtubeButton = screen.getByTestId('youtubeUrlHandler')
    await waitFor(() => {
      userEvent.click(youtubeButton)
    })
  })
  test('Organizer card button redirects to linkedIn', async () => {
    render(
      <Provider store={store}>
        <OrganizerCard userId="" />
      </Provider>,
    )
    const linkedInButton = screen.getByTestId('linkedInUrlHandler')
    await waitFor(() => {
      userEvent.click(linkedInButton)
    })
  })
})
