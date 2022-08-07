import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import React from 'react'
import { Provider } from 'react-redux'

import SignupForm from '../components/SignupForm'
import store from '../redux/store'
import { Status } from '../redux/types'

const errorMinNumberOfLetters =
  'The username cannot have less than 3 characters'
const errorMaxNumberOfLetters =
  'The username cannot have more than 20 characters'
const errorInvalidEmail = 'Invalid email'
const errorUsernameRequired = 'Username field is required'
const errorPasswordRequired = 'Password field is required'
const errorConfirmPasswordRequired = 'Confirm password field is required'
const errorEmailRequired = 'Email field is required'
const errorPasswordLenght = 'The password must have more than 2 characters'
const errorPasswordConfirm = 'Passwords must match'

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
  username: '',
  email: '',
  password: '',
}

function buildSignupForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    ...overrides,
  }
}

describe('Displaying the Sign Up Form', () => {
  test('Rendering the Sign Up Form', () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
      </Provider>,
    )
  })
})

describe('Form Input validation', () => {
  test('displaying error messages when username input is empty', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
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

  test('displaying error messages when email input is empty', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
      </Provider>,
    )

    let emailInput = screen.getByLabelText(/Email/)
    await waitFor(() => {
      emailInput.focus()
      fireEvent.change(emailInput, {
        target: {
          value: '',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText(errorEmailRequired)).toBeInTheDocument()
  })

  test('displaying error messages when password input is empty', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
      </Provider>,
    )

    let passwordInput = screen.getByLabelText('Password')
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

  test('displaying error messages when password confirm input is empty', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
      </Provider>,
    )

    let passwordInput = screen.getByLabelText(/Confirm Password/)
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
    expect(screen.queryByText(errorConfirmPasswordRequired)).toBeInTheDocument()
  })

  test('displaying error messages when username input is too short', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
      </Provider>,
    )

    let usernameInput = screen.getByLabelText(/Username/)
    await waitFor(() => {
      usernameInput.focus()
      fireEvent.change(usernameInput, {
        target: {
          value: 'a1',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText(errorMinNumberOfLetters)).toBeInTheDocument()
  })

  test('displaying error messages when password input is too short', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
      </Provider>,
    )

    let passwordInput = screen.getByLabelText('Password')
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
    expect(screen.queryByText(errorPasswordLenght)).toBeInTheDocument()
  })

  test('displaying error messages when username input is too long', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
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

  test('displaying error messages when email input is invalid', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
      </Provider>,
    )

    let emailInput = screen.getByLabelText(/Email/)
    await waitFor(() => {
      emailInput.focus()
      fireEvent.change(emailInput, {
        target: {
          value: 'asce',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText(errorInvalidEmail)).toBeInTheDocument()
  })

  test('displaying error messages when password and password confirm do not match', async () => {
    const fakeRequestStatus = Status.IDLE
    const fakeUserStatus = false
    render(
      <Provider store={store}>
        <SignupForm
          requestStatus={fakeRequestStatus}
          userInfo={userData}
          userStatus={fakeUserStatus}
        />
      </Provider>,
    )

    let passwordInput = screen.getByLabelText('Password')
    await waitFor(() => {
      passwordInput.focus()
      fireEvent.change(passwordInput, {
        target: {
          value: 'abc123',
        },
      })
    })
    let passwordConfirmInput = screen.getByLabelText(/Confirm Password/)
    await waitFor(() => {
      passwordConfirmInput.focus()
      fireEvent.change(passwordConfirmInput, {
        target: {
          value: 'abc',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText(errorPasswordConfirm)).toBeInTheDocument()
  })

  test('Rendering Signup Form when the username is duplicated', async () => {
    render(
      <Provider store={store}>
        <SignupForm duplicatedUsername={true} duplicatedEmail={false} />
      </Provider>,
    )
    await waitFor(() => {
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    })
  })

  test('Rendering Signup Form when the email is duplicated', async () => {
    render(
      <Provider store={store}>
        <SignupForm duplicatedUsername={false} duplicatedEmail={true} />
      </Provider>,
    )
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })
  })
})

describe('Signup Form Input submiting', () => {
  test('Verifying submited values', async () => {
    const handleSubmit = jest.fn()
    const { email, password } = buildSignupForm()
    const username = 'testuser'
    render(
      <Provider store={store}>
        <SignupForm handleSubmit={handleSubmit} />
      </Provider>,
    )
    let usernameInput = screen.getByLabelText(/Username/)
    await waitFor(() => {
      usernameInput.focus()
      fireEvent.change(usernameInput, {
        target: {
          value: username,
        },
      })
    })

    let passwordInput = screen.getByLabelText('Password')
    await waitFor(() => {
      passwordInput.focus()
      fireEvent.change(passwordInput, {
        target: {
          value: password,
        },
      })
    })

    let passwordConfirmInput = screen.getByLabelText(/Confirm Password/)
    await waitFor(() => {
      passwordConfirmInput.focus()
      fireEvent.change(passwordConfirmInput, {
        target: {
          value: password,
        },
      })
    })

    let emailInput = screen.getByLabelText(/Email/)
    await waitFor(() => {
      emailInput.focus()
      fireEvent.change(emailInput, {
        target: {
          value: email,
        },
      })
    })

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))
    })

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        email,
        password,
        passwordConfirm: password,
        username,
      },
      expect.anything(),
    )
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
