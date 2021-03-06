require('dotenv').config()

let PORT = process.env.PORT
let MongoDB_URI = process.env.MongoDB_URI


module.exports = {
  MongoDB_URI,
  PORT
}