import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import LoginLeftPanel from '../components/LoginLeftPanel'
import LoginMenu from '../components/LoginMenu'
import store from '../redux/store'
import SignIn from '../screens/SignIn'
import { handlers } from '../test/server-handlers'

const server = setupServer(...handlers)

let container

beforeAll(() => server.listen())

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  server.resetHandlers()
  document.body.removeChild(container)
  container = null
})

afterAll(() => server.close())

const fakeUserData = {
  email: 'fake@fake.com',
  pictureUrlProfile: 'fakeUrlImageString',
  token: 'abcde12345',
  username: 'fakeUser',
  userId: 666,
}

describe('Displaying the SignIn page', () => {
  test('Rendering the SignIn page', async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    )
  })
})

describe('Login Page after the user submits the forms', () => {
  test('Login Page after the user submits the form ', async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>,
    )
    let usernameInput = screen.getByLabelText(/Username/)
    await waitFor(() => {
      usernameInput.focus()
      fireEvent.change(usernameInput, {
        target: {
          value: 'nelson',
        },
      })
    })

    let passwordInput = screen.getByLabelText(/Password/)
    await waitFor(() => {
      passwordInput.focus()
      fireEvent.change(passwordInput, {
        target: {
          value: 'hola',
        },
      })
    })

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    })

    expect(screen.getByText(/Loading/)).toBeInTheDocument()
  })

  describe('Displaying the left login panel', () => {
    test('Rendering the Left Panel with Login form', async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LoginLeftPanel login={true} />
          </BrowserRouter>
        </Provider>,
      )

      await waitFor(() => {
        userEvent.click(screen.getByRole('button', { name: /sign up/i }))
      })
    })
  })

  describe('Displaying the Login menu when the user is logged in', () => {
    test('Rendering the Login Menu', async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <LoginMenu
              profilePicture={fakeUserData.pictureUrlProfile}
              userInfo={fakeUserData}
            />
          </BrowserRouter>
        </Provider>,
      )
      userEvent.click(screen.getByText(/logout/i))
    })
  })
})
