import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import CreateEventForm from '../components/CreateEventForm'
import store from '../redux/store'

const getCategory = jest.fn()
const getTag = jest.fn()
const category = ['a', 'b', 'c']
const tags = ['a', 'b', 'c']
test('Create Form fields are empty', async () => {
  const fakeToken = null

  const { findAllByRole } = render(
    <Provider store={store}>
      <CreateEventForm
        category={category}
        getCategory={getCategory}
        getTag={getTag}
        tags={tags}
        token={fakeToken}
      />
    </Provider>,
  )

  const textBoxComponents = await findAllByRole('textbox')
  expect(textBoxComponents[0]).toHaveValue('')
  expect(textBoxComponents[1]).toHaveValue('')
  expect(textBoxComponents[2]).toHaveValue('')
  expect(textBoxComponents[3]).toHaveValue('')
})
