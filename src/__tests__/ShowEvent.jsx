import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import ShowEvent from '../components/ShowEvent'
import store from '../redux/store'

test('Show Event Component is Rendering', async () => {
  render(
    <Provider store={store}>
      <ShowEvent
        category=""
        endDate=""
        description=""
        imageUrl=""
        id=""
        name=""
        speaker=""
        startDate=""
        status=""
        summary=""
        tags=""
      />
    </Provider>,
  )
})
