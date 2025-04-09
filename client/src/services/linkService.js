import api from './api'

// Create new link
const createLink = async (linkData) => {
  const response = await api.post('/links', linkData)
  return response.data
}

// Get user links
const getLinks = async () => {
  const response = await api.get('/links')
  return response.data
}

// Get link by id
const getLinkById = async (linkId) => {
  const response = await api.get(`/links/${linkId}`)
  return response.data
}

const linkService = {
  createLink,
  getLinks,
  getLinkById,
}

export default linkService