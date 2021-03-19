const express = require('express')
const userRouter  = express.Router()
const User = require('../../models/user')
const bcryptjs = require('bcryptjs')



userRouter.get('/', async (request, response) => {
  const users = await User
      .find({}).populate('sellingItems', { itemName:1, price:1, description:1})
    
  response.json(users)
})

userRouter.get('/:id', async (request, response) => {
  await User.findById(request.params.id)
    .then(user => response.json(user))
})

userRouter.post('/',  async (request, response, next) => {
  const body = request.body
  console.log('here is body of request:' , body)
  const saltRounds = 10


  const passwordhash =  await bcryptjs.hash(body.password, saltRounds)

  const newUser = new User ({
    username: body.username,
    name: body.name,
    passwordHash: passwordhash,
    balance: 300
  })

  if (body.password.length >= 5) {
    newUser
    .save()
    .then(user => response.json(user))
    .catch(error => next(error))
  } else {
    response.status(400).json({error: 'Password is too short. Minimum length of password is 5'})
  }
  
})

userRouter.delete('/:id', (request, response) => {
  User.findById(request.params.id)
  .then(user => user.remove().then (() => response.json({ success: true })))
  .catch(error => response.status(404).json({ success: false }))
})

module.exports = userRouter