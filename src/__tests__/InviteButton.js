import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InviteButton from '../components/InviteButton'

test('Test render Invite button', () => {
  render(<InviteButton eventId={'event-id'} token={'token'} />)
  const button = screen.getByRole('button', { name: /invite/i })
  screen.debug()
  expect(button).toHaveTextContent('Invite')
})

test('Test render Invite button', () => {
  render(<InviteButton eventId={'event-id'} token={'token'} />)
  const button = screen.getByRole('button', { name: /invite/i })
  userEvent.click(button)
  const input = screen.getByRole('textbox')
  userEvent.type(input, 'user@mail.com')
})
