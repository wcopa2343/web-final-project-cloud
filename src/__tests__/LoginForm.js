import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import React from 'react'
import { Provider } from 'react-redux'

import LoginForm from '../components/LoginForm'
import store from '../redux/store'

const errorMinNumberOfLetters =
  'The username cannot have less than 3 characters'
const errorMaxNumberOfLetters =
  'The username cannot have more than 20 characters'
const errorUsernameRequired = 'Username field is required'
const errorPasswordRequired = 'Password field is required'
const errorPasswordLength = 'The password must have more than 2 characters'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

const userData = {
  email: '',
  token: '',
  username: '',
  userId: '',
}

function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }
}

describe('Displaying the Login Form', () => {
  test('Rendering the Login Form', () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <LoginForm token={fakeToken} userInfo={userData} />
      </Provider>,
    )
  })
})

describe('Form Input validation', () => {
  test('displaying error messages when username input is empty', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <LoginForm token={fakeToken} userInfo={userData} />
      </Provider>,
    )

    let usernameInput = screen.getByLabelText(/Username/)
    await waitFor(() => {
      usernameInput.focus()
      fireEvent.change(usernameInput, {
        target: {
          value: '',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })

    expect(screen.queryByText(errorUsernameRequired)).toBeInTheDocument()
  })

  test('displaying error messages when password input is empty', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <LoginForm token={fakeToken} userInfo={userData} />
      </Provider>,
    )

    let passwordInput = screen.getByLabelText(/Password/)
    await waitFor(() => {
      passwordInput.focus()
      fireEvent.change(passwordInput, {
        target: {
          value: '',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText(errorPasswordRequired)).toBeInTheDocument()
  })

  test('displaying error messages when username input is too short', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <LoginForm token={fakeToken} userInfo={userData} />
      </Provider>,
    )

    let usernameInput = screen.getByLabelText(/Username/)
    await waitFor(() => {
      usernameInput.focus()
      fireEvent.change(usernameInput, {
        target: {
          value: 'a',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText(errorMinNumberOfLetters)).toBeInTheDocument()
  })

  test('displaying error messages when password input is too short', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <LoginForm token={fakeToken} userInfo={userData} />
      </Provider>,
    )

    let passwordInput = screen.getByLabelText(/Password/)
    await waitFor(() => {
      passwordInput.focus()
      fireEvent.change(passwordInput, {
        target: {
          value: 'a',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText(errorPasswordLength)).toBeInTheDocument()
  })

  test('displaying error messages when username input is too long', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <LoginForm token={fakeToken} userInfo={userData} />
      </Provider>,
    )

    let usernameInput = screen.getByLabelText(/Username/)
    await waitFor(() => {
      usernameInput.focus()
      fireEvent.change(usernameInput, {
        target: {
          value: 'a123456789b1234567890',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText(errorMaxNumberOfLetters)).toBeInTheDocument()
  })
})

describe('Form Input submiting', () => {
  test('Verifying submited values', async () => {
    const handleSubmit = jest.fn()
    render(
      <Provider store={store}>
        <LoginForm handleSubmit={handleSubmit} />
      </Provider>,
    )
    const { password } = buildLoginForm()
    const username = 'testuser'
    let usernameInput = screen.getByLabelText(/Username/)
    await waitFor(() => {
      usernameInput.focus()
      fireEvent.change(usernameInput, {
        target: {
          value: username,
        },
      })
    })

    let passwordInput = screen.getByLabelText(/Password/)
    await waitFor(() => {
      passwordInput.focus()
      fireEvent.change(passwordInput, {
        target: {
          value: password,
        },
      })
    })

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    })

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        username,
        password,
      },
      expect.anything(),
    )
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
