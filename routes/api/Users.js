const bcryptjs = require('bcryptjs')
const express = require('express')
const router  = express.Router()

const User = require('../../models/user')



router.get('/', async (request, response) => {
  await User.find()
    .sort({ date: -1 })
    .then(users => response.json(users))
})

router.get('/:id', async (request, response) => {
  await User.findById(request.params.id)
    .then(user => response.json(user))
})

router.post('/',  async (request, response, next) => {
  const body = request.body
  console.log('here is body of request:' , body)
  const saltRounds = 10

  /*const user = await (await User.find()).filter(user => user.username === body.username)
  
  if (user.length > 0) return response.status(400).json({ message: 'A user with the same username already exists. Please try another username' })
  if (body.password.length<5) return response.status(400).json({ message: 'Password is too short. Minimum length is 5' })
  if (body.name.length < 5) return response.status(400).json({ message: 'Name is too short. Minimum length is 5' })
  if (body.username.length< 5) return response.status(400).json({ message: 'Username is too short. Minimum length is 5' })
*/
  const passwordhash =  await bcryptjs.hash(body.password, saltRounds)

  const newUser = new User ({
    username: body.username,
    name: body.name,
    passwordHash: passwordhash
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

router.delete('/:id', (request, response) => {
  User.findById(request.params.id)
  .then(user => user.remove().then (() => response.json({ success: true })))
  .catch(error => response.status(404).json({ success: false }))
})

module.exports = router