//import axios from 'axios'
//const baseUrl = '/api/items'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`

}

const itemService = { setToken, token }
export default itemService