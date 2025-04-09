import axios from 'axios'

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD
    ? 'https://link-analytics-api.onrender.com/api'
    : 'http://localhost:5000/api')

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to include auth token for authenticated requests
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
