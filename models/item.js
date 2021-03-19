const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema


const ItemSchema = new Schema ({
  itemName: {
    type: String,
    required: true ,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

ItemSchema.plugin(uniqueValidator)


module.exports = Item= mongoose.model('Item', ItemSchema)