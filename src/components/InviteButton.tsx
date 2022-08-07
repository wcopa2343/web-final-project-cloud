import React from 'react'
import { Button } from 'theme-ui'

import { ModalTypes } from '../redux/types'
import { showInputModal } from './common/CustomModal'
import { postInvitation } from '../utils/client'

interface InviteButtonProps {
  eventId: string
  token: string
}

const InviteButton = ({ eventId, token }: InviteButtonProps) => {
  const handlePreConfirm = email => {
    postInvitation({ eventId, email, token })
  }

  const handleOnSuccess = result => result

  const handleClick = () => {
    showInputModal({
      handlePreConfirm,
      handleOnSuccess,
      type: ModalTypes.SendInvitation,
    })
  }

  if (!token) return null
  return (
    <Button onClick={handleClick} variant="gray">
      Invite
    </Button>
  )
}

export default InviteButton
