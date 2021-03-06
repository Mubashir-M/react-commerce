const express = require('express')
const router  = express.Router()

const User = require('../../models/user')

router.get('/', (request, response) => {
  User.find()
    .sort({ date: -1 })
    .then(users => response.json(users))
})

router.post('/', (request, response) => {
  const newUser = new User ({
    username: request.body.username,
    name: request.body.name,
    password: request.body.password
  })
  newUser.save().then (user=> response.json(user))
})

router.delete('/:id', (request, response) => {
  User.findById(request.params.id)
  .then(user => user.remove().then (() => response.json({ success: true })))
  .catch(error => response.status(404).json({ success: false }))
})

module.exports = router