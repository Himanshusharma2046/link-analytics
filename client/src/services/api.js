import axios from 'axios'

// Determine the base URL based on environment
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-url.onrender.com/api'  // Replace with your actual production backend URL
  : 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
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
