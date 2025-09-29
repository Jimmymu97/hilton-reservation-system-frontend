import api from './api'

export default {
  createBooking(bookingData) {
    return api.post('/bookings', bookingData)
  },
  
  getBookings(filters = {}) {
    const params = new URLSearchParams()
    if (filters.date) params.append('date', filters.date)
    if (filters.status && filters.status !== 'all') params.append('status', filters.status)
    
    return api.get(`/bookings?${params.toString()}`)
  },
  
  getBooking(id) {
    return api.get(`/bookings/${id}`)
  },
  
  updateBookingStatus(id, status) {
    return api.patch(`/bookings/${id}/status`, { status })
  },
  
  updateBooking(id, bookingData) {
    return api.put(`/bookings/${id}`, bookingData)
  },
  
  getUpcomingBookings() {
    return api.get('/bookings/upcoming')
  }
}