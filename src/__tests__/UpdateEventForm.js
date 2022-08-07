import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoremIpsum } from 'lorem-ipsum'
import React from 'react'
import { Provider } from 'react-redux'

import UpdateEventForm from '../components/UpdateEventForm'
import store from '../redux/store'
import { EventStatus } from '../redux/types'

window.scrollTo = jest.fn()

const errorFieldRequired = ' field is required'
const errorFieldLengthConstructor = (
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
})

const fakeToken = null
const updateForm = (
  <UpdateEventForm
    token={fakeToken}
    category="Frontend"
    endDate="2020-11-29"
    description="This is the test description for the unit tests."
    id="5fd2d9c0fe74e7ebbc7eeab5"
    name="Test Event"
    speaker="Test Speaker"
    startDate="2020-11-29"
    status={EventStatus.PUBLISHED}
    summary="This is the test summary for the unit tests"
    tags="Tech,Development"
  />
)

describe('Displaying the Update Event Form', () => {
  test('Rendering the Update Event Form', () => {
    render(<Provider store={store}>{updateForm}</Provider>)
  })
})

describe('Form Input validation', () => {
  test('Displaying error messages when name input is empty', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
    render(<Provider store={store}>{updateForm}</Provider>)
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
    render(<Provider store={store}>{updateForm}</Provider>)
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
    render(<Provider store={store}>{updateForm}</Provider>)
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
    render(<Provider store={store}>{updateForm}</Provider>)
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
      screen.queryByText(errorFieldLengthConstructor('name', '50', false)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when description input is too short', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
      screen.queryByText(errorFieldLengthConstructor('name', '2', true)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when description input is too long', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
        errorFieldLengthConstructor('description', '5000', false),
      ),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when description input is too short', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
        errorFieldLengthConstructor('description', '10', true),
      ),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when category input is too long', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
      screen.queryByText(errorFieldLengthConstructor('category', '50', false)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when category input is too short', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
      screen.queryByText(errorFieldLengthConstructor('category', '2', true)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when tag input is too long', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
      screen.queryByText(errorFieldLengthConstructor('tags', '50', false)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when tag input is too short', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
      screen.queryByText(errorFieldLengthConstructor('tags', '2', true)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when summary input is too long', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
      screen.queryByText(errorFieldLengthConstructor('summary', '250', false)),
    ).toBeInTheDocument()
  })

  test('Displaying error messages when summary input is too short', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
      screen.queryByText(errorFieldLengthConstructor('summary', '10', true)),
    ).toBeInTheDocument()
  })

  test('Displaying tag when tag is added to the form', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
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
    render(<Provider store={store}>{updateForm}</Provider>)
    let categoryInput = screen.getByPlaceholderText(/Categories/)
    await waitFor(() => {
      userEvent.type(categoryInput, 'Test Category')
      fireEvent.keyDown(categoryInput, { key: 'Enter', code: 'Enter' })
    })
    expect(screen.getByText(categoryText)).toBeInTheDocument()
  })
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      getPropertyValue: prop => {
        return ''
      },
    }),
  })
  const showModal = jest.fn()
  test('call delete modal', async () => {
    render(<Provider store={store}>{updateForm}</Provider>)
    let deleteButton = screen.queryByText('Delete')
    await waitFor(() => {
      userEvent.click(screen.queryByText('Delete'))
      fireEvent.click(deleteButton, showModal)
    })
    const modal = screen.getByRole('dialog')
    expect(modal).toHaveClass('swal2-popup swal2-modal swal2-icon-warning')
    const inModal = within(screen.getByRole('dialog'))
    await waitFor(() => {
      userEvent.click(inModal.getByRole('button', { name: /Cancel/i }))
    })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
