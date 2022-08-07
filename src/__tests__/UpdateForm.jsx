import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import UpdateEventForm from '../components/UpdateEventForm'
import store from '../redux/store'

test('Update Form text components are Rendering', async () => {
  const { findAllByRole } = render(
    <Provider store={store}>
      <UpdateEventForm
        category="cat"
        description="description"
        endDate="end"
        id="id"
        name="name"
        speaker="speaker"
        startDate="start"
        tags="tags"
        status="status"
        summary="summary"
      />
    </Provider>,
  )

  const textBoxComponents = await findAllByRole('textbox')
  expect(textBoxComponents[0]).toHaveValue('description')
  expect(textBoxComponents[1]).toHaveValue('name')
  expect(textBoxComponents[2]).toHaveValue('summary')
  expect(textBoxComponents[3]).toHaveValue('speaker')
})
