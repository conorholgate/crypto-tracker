import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const showToast = (message, type) => {
  toast(message, {
    type: type,
    multiple: false,
    autoClose: 1000,
    hideProgressBar: true,
  })
  return showToast
}

export default showToast
