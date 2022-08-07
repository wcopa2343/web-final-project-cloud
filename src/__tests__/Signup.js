import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import LoginLeftPanel from '../components/LoginLeftPanel'
import store from '../redux/store'
import SignUp from '../screens/SignUp'
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
  token: 'abcde12345',
  username: 'fakeUser',
  userId: 666,
}

describe('Displaying the SignUp page', () => {
  test('Rendering the SignUp page', () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>,
    )
  })
})

describe('Signup Page after the user submits the form', () => {
  test('Signup Page after the user submits the form ', async () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>,
    )

    let usernameInput = screen.getByLabelText(/Username/)
    await waitFor(() => {
      usernameInput.focus()
      fireEvent.change(usernameInput, {
        target: {
          value: 'test',
        },
      })
    })

    const fakePassword = 'testPassword'
    let passwordInput = screen.getByLabelText('Password')
    await waitFor(() => {
      passwordInput.focus()
      fireEvent.change(passwordInput, {
        target: {
          value: fakePassword,
        },
      })
    })

    let passwordConfirmInput = screen.getByLabelText(/Confirm Password/)
    await waitFor(() => {
      passwordConfirmInput.focus()
      fireEvent.change(passwordConfirmInput, {
        target: {
          value: fakePassword,
        },
      })
    })

    let emailInput = screen.getByLabelText(/Email/)
    await waitFor(() => {
      emailInput.focus()
      fireEvent.change(emailInput, {
        target: {
          value: 'test@test.com',
        },
      })
    })

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /sign up/i }))
    })

    expect(screen.getByText(/Loading/)).toBeInTheDocument()
  })
})

describe('Displaying the left login panel', () => {
  test('Rendering the Left Panel with SignUp form', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginLeftPanel login={false} />
        </BrowserRouter>
      </Provider>,
    )

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    })
  })
})
