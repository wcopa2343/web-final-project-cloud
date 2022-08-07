/** @jsxRuntime classic */
/** @jsx  jsx */

import { HiLink } from 'react-icons/hi'
import {
  SiDiscord,
  SiGooglehangoutsmeet,
  SiMicrosoftteams,
  SiSkype,
  SiWhatsapp,
  SiZoom,
} from 'react-icons/si'
import { Box, Flex, Link, jsx } from 'theme-ui'

const IconStyles = {
  alignSelf: 'center',
  color: 'gray',
  minHeight: '2rem',
  minWidth: '2rem',
}

const LinkStyles = {
  color: 'gray',
  marginLeft: '1rem',
  marginRight: '5px',
  span: { display: 'block', fontSize: '.8em' },
}

const DiscordLink = 'https://discord.gg/'
const GoogleMeetLink = 'https://meet.google.com/'
const MicrosoftTeamsLink = 'https://teams.microsoft.com/'
const SkypeLink = 'https://meet.lync.com/'
const ZoomLink = 'https://zoom.us/'
const WhatsappLink = 'https://wa.me/'

interface IconComponentProps {
  meetingLink: string
}

const IconComponent = ({ meetingLink }: IconComponentProps): JSX.Element => {
  if (meetingLink.startsWith(GoogleMeetLink)) {
    return <SiGooglehangoutsmeet sx={IconStyles} />
  } else if (meetingLink.startsWith(MicrosoftTeamsLink)) {
    return <SiMicrosoftteams sx={IconStyles} />
  } else if (meetingLink.startsWith(ZoomLink)) {
    return <SiZoom sx={IconStyles} />
  } else if (meetingLink.startsWith(SkypeLink)) {
    return <SiSkype sx={IconStyles} />
  } else if (meetingLink.startsWith(DiscordLink)) {
    return <SiDiscord sx={IconStyles} />
  } else if (meetingLink.startsWith(WhatsappLink)) {
    return <SiWhatsapp sx={IconStyles} />
  } else {
    return <HiLink sx={IconStyles} />
  }
}

interface MeetingLinkProps {
  meetingLink: string | undefined
  isLinkVisible: boolean | undefined
  registration: boolean | undefined
}

const MeetingLink = ({
  isLinkVisible = false,
  meetingLink = '',
  registration = false,
}: MeetingLinkProps): JSX.Element => {
  return (
    <Box sx={{ py: '10px' }}>
      {isLinkVisible && meetingLink && registration ? (
        <Flex>
          <IconComponent meetingLink={meetingLink} />
          <Link href={meetingLink} sx={LinkStyles}>
            {meetingLink}
          </Link>
        </Flex>
      ) : null}
    </Box>
  )
}

export default MeetingLink
