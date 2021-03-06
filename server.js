const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const  cors = require ('cors')

const users = require ('./routes/api/users') 

const app = express();


app.use(bodyParser.json())
app.use(cors())

const db = require('./config/config').MONGODB_URI

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))


  app.use('/api/users', users)

const port = process.env.port || 3000
app.listen( port, () => console.log(`server started on port ${port}`))