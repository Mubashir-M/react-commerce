import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/items'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newItem => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post (baseUrl, newItem, config)
  return response.data
}

const update = async newItem => {
  try {
    const response = await axios.put(`${baseUrl}/${newItem.id}`, newItem)
    return response.data
  } catch (error) {
    throw new Error (error.response.data.error)
  }
 
}

const itemService = { setToken, token, getAll, create, update }
export default itemService