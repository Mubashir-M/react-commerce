const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema


const AccountSchema = new Schema ({
  balance: {
    type: Number,
    required: true,
  },
  //shopping cart that is an array with items inside

})

accountSchema.use(uniqueValidator)

module.exports = Account = mongoose('Account',AccountSchema)