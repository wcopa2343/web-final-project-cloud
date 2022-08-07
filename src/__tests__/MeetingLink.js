import React from 'react'
import { render, screen } from '@testing-library/react'
import MeetingLink from '../components/MeetingLink'

const defaultLink = 'http://default.meeting/link'
const googleLink = 'https://meet.google.com/demo-link'
const teamsLink = 'https://teams.microsoft.com/l/meetup-join/demoid'
const zoomLink = 'https://zoom.us/j/5551112222'
const skypeLink = 'https://meet.lync.com/busharegetByorte/0J2YHD0H'
const discordLink = 'https://discord.gg/014imMKqVQOi3q4nY'
const whatsAppLink = 'https://wa.me/123'

const renderLink = link => {
  render(
    <MeetingLink
      meetingLink={link}
      isLinkVisible={true}
      registration={true}
    ></MeetingLink>,
  )
}

const testRenderLink = link => {
  renderLink(link)
  const node = screen.getByRole('link', { name: link })
  expect(node).toHaveTextContent(link)
}

test('Test render MeetingLink component', () => {
  testRenderLink(defaultLink)
  testRenderLink(googleLink)
  testRenderLink(teamsLink)
  testRenderLink(zoomLink)
  testRenderLink(skypeLink)
  testRenderLink(discordLink)
  testRenderLink(whatsAppLink)
})
