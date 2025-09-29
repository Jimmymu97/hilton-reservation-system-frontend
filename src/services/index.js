import bookingApi from './bookingApi'
import authApi from './authApi'

export default {
  install(Vue) {
    Vue.prototype.$api = {
      bookings: bookingApi,
      auth: authApi
    }
  }
}