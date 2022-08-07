import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'

import CreateConferenceForm from '../components/CreateConferenceForm'
import ConferenceCreate from '../screens/ConferenceCreate'
import store from '../redux/store'

test('Create Conference fields are empty', async () => {
  const { findAllByRole } = render(
    <Provider store={store}>
      <CreateConferenceForm />
    </Provider>,
  )

  const textBoxComponents = await findAllByRole('textbox')
  expect(textBoxComponents[0]).toHaveValue('')
  expect(textBoxComponents[1]).toHaveValue('')
})

describe('Form Validations', () => {
  test('submits correct values', async () => {
    const { container } = render(
      <Provider store={store}>
        <CreateConferenceForm />
      </Provider>,
    )

    const name = container.querySelector('input[name="conferenceName"]')
    const description = container.querySelector('textarea')

    await waitFor(() => {
      name.focus()
      fireEvent.change(name, {
        target: {
          value: 'Conference Name',
        },
      })
    })

    await waitFor(() => {
      description.focus()
      fireEvent.change(description, {
        target: {
          value: 'Brief Description',
        },
      })
    })

    expect(name.value).toBe('Conference Name')
    expect(description.value).toBe('Brief Description')
  })
})

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: prop => {
      return ''
    },
  }),
})

describe('Create conference is working', () => {
  test('Page is loading', async () => {
    render(<CreateConferenceForm loading={true} />)
  })

  test('Image error', async () => {
    render(
      <CreateConferenceForm
        bannerError={false}
        imageError={false}
        logoError={false}
        loading={false}
      />,
    )
  })

  test('No image error', async () => {
    render(
      <CreateConferenceForm
        bannerError={true}
        imageError={true}
        logoError={true}
        loading={false}
      />,
    )
  })

  test('No image error', async () => {
    render(
      <CreateConferenceForm
        bannerError={true}
        imageError={true}
        logoError={true}
        loading={false}
      />,
    )
  })
})

test('Conference form is submitting', async () => {
  const handleSubmit = jest.fn()
  render(
    <Provider store={store}>
      <CreateConferenceForm handleSubmit={handleSubmit} />
    </Provider>,
  )

  const name = 'Blizzcon'
  const description = 'Description of this event'

  userEvent.type(screen.getByPlaceholderText('Name of the conference'), name)
  userEvent.type(
    screen.getByPlaceholderText('Description of the conference'),
    description,
  )

  await waitFor(() => {
    userEvent.click(
      screen.getByRole('button', {
        name: /create/i,
      }),
    )
  })

  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('Submitting Button is being called', async () => {
  const handleSubmit = jest.fn()
  render(
    <Provider store={store}>
      <ConferenceCreate>
        <CreateConferenceForm
          handleSubmit={handleSubmit}
        ></CreateConferenceForm>
      </ConferenceCreate>
    </Provider>,
  )

  const name = 'Blizzcon'
  const description = 'Description of this event'

  userEvent.type(screen.getByPlaceholderText('Name of the conference'), name)
  userEvent.type(
    screen.getByPlaceholderText('Description of the conference'),
    description,
  )

  await waitFor(() => {
    userEvent.click(
      screen.getByRole('button', {
        name: /create/i,
      }),
    )
  })
})
