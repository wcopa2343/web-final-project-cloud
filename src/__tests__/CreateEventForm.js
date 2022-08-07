import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoremIpsum } from 'lorem-ipsum'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'

import CreateEventForm from '../components/CreateEventForm'
import store from '../redux/store'
import { handlers } from '../test/server-handlers'

const server = setupServer(...handlers)
beforeAll(() => {
  server.listen()
})

const getCategory = jest.fn()
const getTag = jest.fn()
const category = ['a', 'b', 'c']
const tags = ['a', 'b', 'c']

const errorFieldRequired = ' field is required'
const errorFieldLenghtConstructor = (
  field,
  numberOfCharacters,
  isCheckingMinimum,
) => {
  return `The ${field} cannot have ${
    isCheckingMinimum ? 'less' : 'more'
  } than ${numberOfCharacters} characters`
}
const tagText = /Tag/i
const categoryText = /Categories/i
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

describe('Displaying the Create Event Form', () => {
  test('Rendering the Create Event Form', () => {
    const fakeToken = null
    render(
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
  })
})

describe('Form Input validation', () => {
  test('Displaying error messages when name input is empty', async () => {
    const fakeToken = null
    render(
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
    let nameInput = screen.getByPlaceholderText(/Name/)
    await waitFor(() => {
      nameInput.focus()
      fireEvent.change(nameInput, {
        target: {
          value: '',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(screen.queryByText('Name' + errorFieldRequired)).toBeInTheDocument()
  })

  test('Displaying error messages when description input is empty', async () => {
    const fakeToken = null
    render(
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
    let descriptionInput = screen.getByPlaceholderText(
      /Description of the event/,
    )
    await waitFor(() => {
      descriptionInput.focus()
      fireEvent.change(descriptionInput, {
        target: {
          value: '',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText('Description' + errorFieldRequired),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when speaker input is empty', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <CreateEventForm
          category={category}
          getTag={getTag}
          getCategory={getCategory}
          tags={tags}
          token={fakeToken}
        />
      </Provider>,
    )
    let speakerInput = screen.getByPlaceholderText(/Speaker/)
    await waitFor(() => {
      speakerInput.focus()
      fireEvent.change(speakerInput, {
        target: {
          value: '',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText('Speaker' + errorFieldRequired),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when summary input is empty', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <CreateEventForm
          category={category}
          getTag={getTag}
          getCategory={getCategory}
          tags={tags}
          token={fakeToken}
        />
      </Provider>,
    )
    let summaryInput = screen.getByPlaceholderText(/Summary/)
    await waitFor(() => {
      summaryInput.focus()
      fireEvent.change(summaryInput, {
        target: {
          value: '',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText('Summary' + errorFieldRequired),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when name input is too long', async () => {
    const fakeToken = null
    render(
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
    let nameInput = screen.getByPlaceholderText(/Name/)
    await waitFor(() => {
      nameInput.focus()
      fireEvent.change(nameInput, {
        target: {
          value: lorem.generateWords(200),
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(errorFieldLenghtConstructor('name', '50', false)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when description input is too short', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <CreateEventForm
          category={category}
          getTag={getTag}
          getCategory={getCategory}
          tags={tags}
          token={fakeToken}
        />
      </Provider>,
    )
    let nameInput = screen.getByPlaceholderText(/Name/)
    await waitFor(() => {
      nameInput.focus()
      fireEvent.change(nameInput, {
        target: {
          value: 'a',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(errorFieldLenghtConstructor('name', '2', true)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when description input is too long', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <CreateEventForm
          category={category}
          getTag={getTag}
          getCategory={getCategory}
          tags={tags}
          token={fakeToken}
        />
      </Provider>,
    )
    let descriptionInput = screen.getByPlaceholderText(
      /Description of the event/,
    )
    await waitFor(() => {
      descriptionInput.focus()
      fireEvent.change(descriptionInput, {
        target: {
          value: lorem.generateWords(7000),
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(
        errorFieldLenghtConstructor('description', '5000', false),
      ),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when description input is too short', async () => {
    const fakeToken = null
    render(
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
    let descriptionInput = screen.getByPlaceholderText(
      /Description of the event/,
    )
    await waitFor(() => {
      descriptionInput.focus()
      fireEvent.change(descriptionInput, {
        target: {
          value: 'a',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(
        errorFieldLenghtConstructor('description', '10', true),
      ),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when category input is too long', async () => {
    const fakeToken = null
    render(
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
    let categoriesInput = screen.getByPlaceholderText(/Categories/)
    await waitFor(() => {
      categoriesInput.focus()
      fireEvent.change(categoriesInput, {
        target: {
          value: lorem.generateWords(200),
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(errorFieldLenghtConstructor('category', '50', false)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when category input is too short', async () => {
    const fakeToken = null
    render(
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
    let categoriesInput = screen.getByPlaceholderText(/Categories/)
    await waitFor(() => {
      categoriesInput.focus()
      fireEvent.change(categoriesInput, {
        target: {
          value: 'a',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(errorFieldLenghtConstructor('category', '2', true)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when tag input is too long', async () => {
    const fakeToken = null
    render(
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
    let tagsInput = screen.getByPlaceholderText(/Tags/)
    await waitFor(() => {
      tagsInput.focus()
      fireEvent.change(tagsInput, {
        target: {
          value: lorem.generateWords(200),
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(errorFieldLenghtConstructor('tags', '50', false)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when tag input is too short', async () => {
    const fakeToken = null
    render(
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
    let tagsInput = screen.getByPlaceholderText(/Tags/)
    await waitFor(() => {
      tagsInput.focus()
      fireEvent.change(tagsInput, {
        target: {
          value: 'a',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(errorFieldLenghtConstructor('tags', '2', true)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when summary input is too long', async () => {
    const fakeToken = null
    render(
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
    let summaryInput = screen.getByPlaceholderText(/Summary/)
    await waitFor(() => {
      summaryInput.focus()
      fireEvent.change(summaryInput, {
        target: {
          value: lorem.generateWords(500),
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(errorFieldLenghtConstructor('summary', '250', false)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when summary input is too short', async () => {
    const fakeToken = null
    render(
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
    let summaryInput = screen.getByPlaceholderText(/Summary/)
    await waitFor(() => {
      summaryInput.focus()
      fireEvent.change(summaryInput, {
        target: {
          value: 'a',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText(errorFieldLenghtConstructor('summary', '10', true)),
    ).toBeInTheDocument()
  })

  test('Displaying tag when tag is added to the form', async () => {
    const fakeToken = null
    render(
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
    let tagInput = screen.getByPlaceholderText(/Tags/)
    await waitFor(() => {
      tagInput.focus()
      fireEvent.change(tagInput, {
        target: {
          value: 'Test Tag',
        },
      })
      fireEvent.keyDown(tagInput, { key: 'Enter', code: 'Enter' })
    })
    expect(screen.getByText(tagText)).toBeInTheDocument()
  })

  test('Displaying category when category is added to the form', async () => {
    const fakeToken = null
    render(
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
    let categoryInput = screen.getByPlaceholderText(/Categories/)
    await waitFor(() => {
      userEvent.type(categoryInput, 'Test Category')
      fireEvent.keyDown(categoryInput, { key: 'Enter', code: 'Enter' })
    })
    expect(screen.getByText(categoryText)).toBeInTheDocument()
  })

  test('Displaying error messages when capacity input is empty', async () => {
    const fakeToken = null
    render(
      <Provider store={store}>
        <CreateEventForm
          category={category}
          getTag={getTag}
          getCategory={getCategory}
          tags={tags}
          token={fakeToken}
        />
      </Provider>,
    )
    let capacityInput = screen.getByTestId(/capacity/)
    await waitFor(() => {
      capacityInput.focus()
      fireEvent.change(capacityInput, {
        target: {
          value: '',
        },
      })
    })
    await waitFor(() => {
      userEvent.tab()
    })
    expect(
      screen.queryByText('Capacity' + errorFieldRequired),
    ).toBeInTheDocument()
  })
})

describe('Form Input submiting', () => {
  test('Verifying submitted values', async () => {
    const fakeToken = ''
    const handleSubmit = jest.fn()
    const getImage = jest.fn()
    render(
      <Provider store={store}>
        <CreateEventForm
          category={category}
          getCategory={getCategory}
          getImage={getImage}
          getTag={getTag}
          handleSubmit={handleSubmit}
          token={fakeToken}
          tags={tags}
        />
      </Provider>,
    )
    const eventNameInput = screen.getByPlaceholderText(/Name of the event/i)
    const tagsInput = screen.getByPlaceholderText(tagText)
    const categoriesInput = screen.getByPlaceholderText(categoryText)
    const speakerInput = screen.getByPlaceholderText(/Event Speaker/)
    const summaryInput = screen.getByPlaceholderText(/Summary/)
    const descriptionInput = screen.getByPlaceholderText(
      /Description of the event/,
    )
    const startDateInput = screen.getByTestId(/startDate/)
    const endDateInput = screen.getByTestId(/endDate/)
    const capacityInput = screen.getByTestId(/capacity/)

    await waitFor(() => {
      eventNameInput.focus()
      fireEvent.change(eventNameInput, {
        target: {
          value: 'This is a test Event',
        },
      })
    })
    await waitFor(() => {
      startDateInput.focus()
      fireEvent.change(startDateInput, {
        target: {
          value: '2021-01-18T15:40',
        },
      })
    })

    await waitFor(() => {
      endDateInput.focus()
      fireEvent.change(endDateInput, {
        target: {
          value: '2021-01-18T15:59',
        },
      })
    })

    await waitFor(() => {
      summaryInput.focus()
      fireEvent.change(summaryInput, {
        target: {
          value: 'This is a very short summary',
        },
      })
    })

    await waitFor(() => {
      speakerInput.focus()
      fireEvent.change(speakerInput, {
        target: {
          value: 'Jon Doe',
        },
      })
    })

    await waitFor(() => {
      tagsInput.focus()
      fireEvent.change(tagsInput, {
        target: {
          value: 'TestTag',
        },
      })
      fireEvent.keyDown(tagsInput, { key: 'Enter', code: 'Enter' })
    })

    await waitFor(() => {
      categoriesInput.focus()
      fireEvent.change(categoriesInput, {
        target: {
          value: 'TestCategory',
        },
      })
      fireEvent.keyDown(categoriesInput, { key: 'Enter', code: 'Enter' })
    })

    await waitFor(() => {
      descriptionInput.focus()
      fireEvent.change(descriptionInput, {
        target: {
          value: 'This is a very short test description for a test event',
        },
      })
    })

    await waitFor(() => {
      capacityInput.focus()
      fireEvent.change(capacityInput, {
        target: {
          value: '10',
        },
      })
    })

    await waitFor(() => {
      userEvent.click(
        screen.getByRole('button', {
          name: /create/i,
        }),
      )
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
