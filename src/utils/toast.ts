import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  toast: true,
})

interface ToastOptions {
  action: 'success' | 'warning' | 'error' | undefined
  message: string
}

export default function toast({ action, message }: ToastOptions) {
  Toast.fire({
    icon: action,
    title: message,
  })
}
