const state = {
  user: null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  initialized: false
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem('authToken', token)
    } else {
      localStorage.removeItem('authToken')
    }
  },
  SET_AUTHENTICATED(state, status) {
    state.isAuthenticated = status
  },
  SET_INITIALIZED(state, status) {
    state.initialized = status
  },
  LOGOUT(state) {
    state.user = null
    state.token = null
    state.isAuthenticated = false
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      this._vm.$api.auth.login(username, password)
        .then(response => {
          if (response.success) {
            commit('SET_TOKEN', response.data.token)
            commit('SET_USER', response.data.user)
            commit('SET_AUTHENTICATED', true)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            resolve(response)
          } else {
            reject(new Error(response.message || 'Login failed'))
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  
  logout({ commit }) {
    commit('LOGOUT')
  },
  
  initializeAuth({ commit }) {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        commit('SET_TOKEN', token)
        commit('SET_USER', user)
        commit('SET_AUTHENTICATED', true)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        commit('LOGOUT')
      }
    }
    
    commit('SET_INITIALIZED', true)
  }
}

const getters = {
  currentUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated,
  isAdmin: state => state.user && state.user.role === 'admin',
  isStaff: state => state.user && (state.user.role === 'staff' || state.user.role === 'admin'),
  isInitialized: state => state.initialized
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}