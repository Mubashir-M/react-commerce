import axios from 'axios'


const baseUrl = 'http://localhost:3000/api/users'


const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const registerService = { create}


export default registerService