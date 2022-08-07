import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formik } from 'formik'
import { setupServer } from 'msw/node'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'

import Search, { FloatingMenu } from '../components/Search'
import store from '../redux/store'
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

test('Search bar is rendering', () => {
  render(
    <Provider store={store}>
      <Search />
    </Provider>,
  )
  expect(screen.getByText('Search')).toBeInTheDocument()
})

test('Show filter options', async () => {
  const { container } = render(
    <Provider store={store}>
      <Search />
    </Provider>,
  )
  const buttons = container.querySelectorAll('button')
  const [filter, changeSortItem, changeSort, search] = buttons

  expect(screen.getByText(/Tags/i)).not.toBeVisible()
  await waitFor(() => {
    fireEvent.click(filter)
  })
  expect(screen.getByText(/Tags/i)).toBeVisible()
  await waitFor(() => {
    fireEvent.click(filter)
  })
  expect(screen.getByText(/Tags/i)).not.toBeVisible()

  await waitFor(() => {
    userEvent.click(changeSortItem)
    userEvent.click(changeSort)
    userEvent.click(search)
  })
})

test('Render FloatingMenu', () => {
  const onSubmit = jest.fn()
  const handleChangeOrderType = jest.fn()
  const handleJoinedEventsToggle = jest.fn()
  render(
    <Formik initialValues={{}} onSubmit={onSubmit}>
      <FloatingMenu
        handleChangeOrderType={handleChangeOrderType}
        handleJoinedEventsToggle={handleJoinedEventsToggle}
        isAscending={false}
        onlyJoinedEvents={false}
        userId={1234}
      />
    </Formik>,
  )
  expect(screen.getByText(/Joined/i)).toBeInTheDocument()
})

test('FloatingMenuTest - handleOnlyJoinedEvents is called', async () => {
  const onSubmit = jest.fn()
  const handleChangeOrderType = jest.fn()
  const handleJoinedEventsToggle = jest.fn()
  render(
    <Formik initialValues={{}} onSubmit={onSubmit}>
      <FloatingMenu
        handleChangeOrderType={handleChangeOrderType}
        handleJoinedEventsToggle={handleJoinedEventsToggle}
        isAscending={false}
        onlyJoinedEvents={false}
        userId={1234}
      />
    </Formik>,
  )
  const changeOnlyJoinedEventToggle = screen.getByRole('checkbox')
  await waitFor(() => userEvent.click(changeOnlyJoinedEventToggle))
  expect(handleJoinedEventsToggle).toHaveBeenCalled()
})

test('FloatingMenuTest - handleChangeOrderType is called', async () => {
  const onSubmit = jest.fn()
  const handleChangeOrderType = jest.fn()
  const handleJoinedEventsToggle = jest.fn()
  const { container } = render(
    <Formik initialValues={{}} onSubmit={onSubmit}>
      <FloatingMenu
        handleChangeOrderType={handleChangeOrderType}
        handleJoinedEventsToggle={handleJoinedEventsToggle}
        isAscending={false}
        onlyJoinedEvents={false}
        userId={1234}
      />
    </Formik>,
  )

  const elements = container.querySelectorAll('button')
  const [changeSortTypeButton] = elements
  await waitFor(() => userEvent.click(changeSortTypeButton))
  expect(handleChangeOrderType).toHaveBeenCalled()
})
