import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import AccountInformation from '../components/AccountInformation'
import store from '../redux/store'
import Account from '../screens/Account'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('Account Information Tests', () => {
  it('Render Account Information Form', () => {
    render(
      <Provider store={store}>
        <AccountInformation
          facebookUrlProfile="facebookUrlProfile"
          firstName="firstName"
          lastName="lastName"
          linkedinUrlProfile="linkedinUrlProfile"
          pictureUrlProfile="pictureUrlProfile"
          twitterUrlProfile="twitterUrlProfile"
          userId="userId"
          youtubeUrlProfile="youtubeUrlProfile"
        />
      </Provider>,
    )
  })
})

describe('Account Information Tests', () => {
  it('Render Account Information Page', () => {
    render(
      <Provider store={store}>
        <Account></Account>
      </Provider>,
    )
  })
})
