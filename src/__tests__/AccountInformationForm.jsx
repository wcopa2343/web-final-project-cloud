import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import AccountInformation from '../components/AccountInformation'
import store from '../redux/store'

test('Account information text components are Rendering', async () => {
  const { findAllByRole } = render(
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

  const textBoxComponents = await findAllByRole('textbox')
  expect(textBoxComponents[0]).toHaveValue('firstName')
  expect(textBoxComponents[1]).toHaveValue('lastName')
  expect(textBoxComponents[2]).toHaveValue('facebookUrlProfile')
  expect(textBoxComponents[3]).toHaveValue('linkedinUrlProfile')
  expect(textBoxComponents[4]).toHaveValue('twitterUrlProfile')
  expect(textBoxComponents[5]).toHaveValue('youtubeUrlProfile')
})
