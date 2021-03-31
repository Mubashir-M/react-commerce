import axios from 'axios'


const baseUrl = 'http://localhost:3000/api/users'

const create = async newUser => {

    try {
        const response = await axios.post(baseUrl, newUser)
        return response.data
    } catch(error) {
        
        if (error.response.data.error.includes('User validation failed: username: Error')){
            console.log(error.response.data.error)
            throw new Error ('A user with the same username already exists. Please try another username.')
        } else if (error.response.data.error.includes ('User validation failed: name: Path')){
            console.log(error.response.data.error)
            throw new Error ('Given name is too short. Please input a name longer than 5 characters.')
        } else {
            throw new Error (error.response.data.error)
        }
      
    }
    

}


const get = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const userService = { create, get}


export default userService