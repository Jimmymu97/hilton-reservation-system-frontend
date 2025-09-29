import axios from 'axios'
import { Message } from 'element-ui'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          Message.error('Authentication failed, please log in again')
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
          window.location.href = '/staff/login'
          break
        case 403:
          Message.error('Insufficient permissions')
          break
        case 404:
          Message.error('The requested resource does not exist')
          break
        case 500:
          Message.error('Internal server error')
          break
        default:
          Message.error(data.message || 'Request failed')
      }
    } else {
      Message.error('Network error, please check network connection')
    }
    
    return Promise.reject(error)
  }
)

export default api