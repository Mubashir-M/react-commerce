const express = require('express')
const loginRouter  = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')


loginRouter.post('/', async (request, response) => {

  const body = request.body
 
  const user = await User.findOne({ username: body.loginUsername})
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.loginPassword, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  const userForToken = {
    usernname: user.username,
    id: user._id
  }
  
  const token = jwt.sign(userForToken,process.env.SECRET)

  response
    .status(200)
    .send({ token, user})
})



module.exports = loginRouter