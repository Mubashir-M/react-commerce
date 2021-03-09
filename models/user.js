const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema


const UserSchema = new Schema ({
  username: {
    type: String,
    required: true ,
    unique: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    minlength: 5, 
  },
  passwordHash: {
    type: String,
    required: true
  }
})

UserSchema.plugin(uniqueValidator)


module.exports = User = mongoose.model('User', UserSchema)