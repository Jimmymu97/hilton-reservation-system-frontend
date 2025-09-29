const state = {
  bookings: [],
  currentBooking: null,
  filters: {
    date: null,
    status: 'all'
  },
  loading: false
}

const mutations = {
  SET_BOOKINGS(state, bookings) {
    state.bookings = bookings
  },
  SET_CURRENT_BOOKING(state, booking) {
    state.currentBooking = booking
  },
  UPDATE_BOOKING_STATUS(state, { bookingId, status }) {
    const bookingIndex = state.bookings.findIndex(b => b._id === bookingId || b.id === bookingId)
    if (bookingIndex !== -1) {
      state.bookings[bookingIndex] = {
        ...state.bookings[bookingIndex],
        status: status,
        updatedAt: new Date().toISOString()
      }
    }
  },
  SET_FILTERS(state, filters) {
    state.filters = { ...state.filters, ...filters }
  },
  ADD_BOOKING(state, booking) {
    state.bookings = [booking, ...state.bookings]
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  async fetchBookings({ commit, state }) {
    try {
      commit('SET_LOADING', true)
      const response = await this._vm.$api.bookings.getBookings(state.filters)
      commit('SET_BOOKINGS', response.data || [])
      return response
    } catch (error) {
      console.error('Failed to retrieve the booking list:', error)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },
  
  async createBooking({ commit }, bookingData) {
    try {
      const response = await this._vm.$api.bookings.createBooking(bookingData)
      commit('ADD_BOOKING', response.data)
      return response
    } catch (error) {
      console.error('Failed to create reservation:', error)
      throw error
    }
  },
  
  async updateBookingStatus({ commit }, { bookingId, status }) {
    try {
      const response = await this._vm.$api.bookings.updateBookingStatus(bookingId, status)
      commit('UPDATE_BOOKING_STATUS', { bookingId, status })
      return response
    } catch (error) {
      console.error('Failed to update booking status:', error)
      throw error
    }
  },
  
  async setFilters({ commit, dispatch }, filters) {
    commit('SET_FILTERS', filters)
    return dispatch('fetchBookings')
  }
}

const getters = {
  allBookings: state => state.bookings,
  
  upcomingBookings: state => {
    const now = new Date()
    const upcoming = state.bookings.filter(booking => {
      const arrivalTime = new Date(booking.arrivalTime)
      return arrivalTime > now && ['requested', 'confirmed'].includes(booking.status)
    })
    
    return upcoming.slice().sort((a, b) => new Date(a.arrivalTime) - new Date(b.arrivalTime))
  },
  
  filteredBookings: state => {
    let filtered = state.bookings.slice()
    
    if (state.filters.status && state.filters.status !== 'all') {
      filtered = filtered.filter(booking => booking.status === state.filters.status)
    }
    
    if (state.filters.date) {
      const filterDate = new Date(state.filters.date)
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.arrivalTime)
        return bookingDate.toDateString() === filterDate.toDateString()
      })
    }
    
    return filtered.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },
  
  isLoading: state => state.loading,
  
  bookingsCount: state => state.bookings.length,
  
  bookingsByStatus: state => {
    const counts = {
      requested: 0,
      confirmed: 0,
      cancelled: 0,
      completed: 0,
      total: state.bookings.length
    }
    
    state.bookings.forEach(booking => {
      if (counts[booking.status] !== undefined) {
        counts[booking.status]++
      }
    })
    
    return counts
  },
  
  sortedBookings: state => (sortBy = 'createdAt', order = 'desc') => {
    const bookingsCopy = state.bookings.slice()
    
    return bookingsCopy.sort((a, b) => {
      const aValue = new Date(a[sortBy])
      const bValue = new Date(b[sortBy])
      
      if (order === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}