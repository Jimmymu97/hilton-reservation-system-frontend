import api from './api'

export default {
  login(username, password) {
    return api.post('/auth/login', { username, password })
  },
  
  getProfile() {
    return api.get('/auth/me')
  }
}