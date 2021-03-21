const express = require('express')
const itemRouter  = express.Router()

const Item = require('../../models/item')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)  }  
  return null
}

itemRouter.get('/', async (request, response) => {
  const items = await Item.find({}).populate('user', { username: 1, name: 1, id: 1 } )
  response.json(items.map(item => item.toJSON()))
})

itemRouter.get('/:id', async (request, response) => {
  await Item.findById(request.params.id)
    .then(item => response.json(item))
})

itemRouter.post('/', async (request, response) => {

  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id) 
  const newItem = new Item ({
    itemName: body.itemName,
    price: body.price,
    description: body.description,
    status: 'Selling',
    user: user._id
  })

  const savedItem = await newItem.save()
  user.sellingItems =  user.sellingItems.concat(savedItem._id)
  await user.save()
  response.json(savedItem.toJSON())
})

itemRouter.put('/:id',  async (request, response) => {
  const body = reques.body

  const item = {
    itemName: body.itemName,
    price: body.price,
    description: body.description,
    status: body.status,
    user: body.user_id
  }

  await Item.findByIdAndUpdate(request.params.id, item , { new: true })
  response.json(item)
})


module.exports  = itemRouter