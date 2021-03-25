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
  user.Items =  user.Items.concat(savedItem._id)
  await user.save()
  response.json(savedItem.toJSON())
})

itemRouter.put('/:id',  async (request, response) => {
  const body = request.body
  
  const oldUser_id = await Item.findById(request.params.id)
  
  const oldUser = await User.findById(oldUser_id.user)
  
  const newUser_id = body.user
  
  const newUser = await User.findById(newUser_id)
  console.log('oldUser.balance: ', oldUser.balance-body.price)
  if ((oldUser.balance-body.price) < 0 ) {
    return response.status(401).json({error: 'Account balance too low for purchase!'})
  }

  const item = {
    itemName: body.itemName,
    price: body.price,
    description: body.description,
    status: body.status,
    user: body.user
  }

  const updatedItem = await Item.findByIdAndUpdate(request.params.id, item , { new: true })
  oldUser.Items = oldUser.Items.filter(itemID => itemID != request.params.id)
  oldUser.balance = oldUser.balance+body.price
  oldUser.save()
  newUser.balance = newUser.balance-body.price
  newUser.Items = newUser.Items.concat(updatedItem._id)
  newUser.save()

  response.json(updatedItem.toJSON())
  
  
})


module.exports  = itemRouter