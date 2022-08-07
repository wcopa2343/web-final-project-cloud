import Swal from 'sweetalert2'

import { ModalTypes } from '../../redux/types'

const ConfirmDeleteModalValues = {
  AllowOutsideClick: true,
  CancelButtonColor: '#DA3C3D',
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Yes, delete it!',
  Icon: 'warning',
  ShowCancelButton: true,
  Text: "You won't be able to revert this!",
  Title: 'Are you sure?',
}

const DeleteSucceededModalValues = {
  AllowOutsideClick: true,
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Okay',
  Icon: 'success',
  ShowCancelButton: false,
  Text: 'Your event has been deleted.',
  Title: 'Deleted!',
}

const ConfirmUpdateModalValues = {
  AllowOutsideClick: true,
  CancelButtonColor: '#DA3C3D',
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Yes, update it!',
  Icon: 'warning',
  ShowCancelButton: true,
  Text: 'Changes may affect the visibility of your event!',
  Title: 'Are you sure?',
}
const ConfirmConferenceUpdateModalValues = {
  AllowOutsideClick: true,
  CancelButtonColor: '#DA3C3D',
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Yes, update it!',
  Icon: 'warning',
  ShowCancelButton: true,
  Text: 'Changes may affect the visibility of your conference!',
  Title: 'Are you sure?',
}
const UpdateSucceededModalValues = {
  AllowOutsideClick: true,
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Okay',
  Icon: 'success',
  ShowCancelButton: false,
  Text: 'Your event has been updated.',
  Title: 'Updated!',
}
const UpdateConferenceSucceededModalValues = {
  AllowOutsideClick: true,
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Okay',
  Icon: 'success',
  ShowCancelButton: false,
  Text: 'Your conference has been updated.',
  Title: 'Updated!',
}

const SessionExpiredModal = {
  AllowOutsideClick: false,
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Okay',
  Icon: 'info',
  ShowCancelButton: false,
  Text: 'Your session has expired, you will be redirected to Login Page.',
  Title: 'Session Expired!',
}

const EventIsFullModalValues = {
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Okay',
  ShowCancelButton: false,
  Icon: 'info',
  Title: 'Event Full!',
  Text: 'This event has reached the maximum number of participants.',
  AllowOutsideClick: true,
}

const SendInvitation = {
  AllowOutsideClick: () => !Swal.isLoading(),
  ConfirmButtonColor: '#3EBA9B',
  ConfirmButtonText: 'Invite',
  Input: 'email',
  InputAttributer: {
    autocapitalize: 'off',
  },
  ReverseButtons: true,
  ShowCancelButton: true,
  ShowLoaderOnConfirm: true,
  Title: 'Send invitation',
}

const dictionary = new Map()

dictionary.set(ModalTypes.ConfirmDeleteModalValues, ConfirmDeleteModalValues)
dictionary.set(
  ModalTypes.DeleteSucceededModalValues,
  DeleteSucceededModalValues,
)
dictionary.set(
  ModalTypes.DeleteSucceededModalValues,
  DeleteSucceededModalValues,
)
dictionary.set(ModalTypes.ConfirmUpdateModalValues, ConfirmUpdateModalValues)
dictionary.set(
  ModalTypes.UpdateSucceededModalValues,
  UpdateSucceededModalValues,
)
dictionary.set(
  ModalTypes.ConfirmUpdateConferenceModalValues,
  ConfirmConferenceUpdateModalValues,
)
dictionary.set(
  ModalTypes.UpdateConferenceSucceededModalValues,
  UpdateConferenceSucceededModalValues,
)
dictionary.set(ModalTypes.SessionExpiredModal, SessionExpiredModal)
dictionary.set(ModalTypes.EventIsFullModalValues, EventIsFullModalValues)
dictionary.set(ModalTypes.SendInvitation, SendInvitation)
interface ModalOptions {
  type: string
  onSuccess: () => void
}
export default function showModal({ onSuccess, type }: ModalOptions): void {
  const {
    AllowOutsideClick,
    CancelButtonColor,
    ConfirmButtonColor,
    ConfirmButtonText,
    Icon,
    ShowCancelButton,
    Text,
    Title,
  } = dictionary.get(type)

  Swal.fire({
    allowOutsideClick: AllowOutsideClick,
    cancelButtonColor: CancelButtonColor,
    confirmButtonColor: ConfirmButtonColor,
    confirmButtonText: ConfirmButtonText,
    icon: Icon,
    showCancelButton: ShowCancelButton,
    text: Text,
    title: Title,
  }).then(result => {
    if (result.isConfirmed) {
      onSuccess()
    }
  })
}

interface showInputModalProps {
  handlePreConfirm: (data: any) => any
  handleOnSuccess: (data: any) => any
  type: string
}

export function showInputModal({ handlePreConfirm, handleOnSuccess, type }) {
  const {
    AllowOutsideClick,
    ConfirmButtonColor,
    ConfirmButtonText,
    Input,
    InputAttributes,
    ReverseButtons,
    ShowCancelButton,
    ShowLoaderOnConfirm,
    Title,
  } = dictionary.get(type)
  Swal.fire({
    allowOutsideClick: AllowOutsideClick,
    confirmButtonColor: ConfirmButtonColor,
    confirmButtonText: ConfirmButtonText,
    input: Input,
    inputAttributes: InputAttributes,
    preConfirm: handlePreConfirm,
    reverseButtons: ReverseButtons,
    showCancelButton: ShowCancelButton,
    showLoaderOnConfirm: ShowLoaderOnConfirm,
    title: Title,
  }).then(handleOnSuccess)
}
