const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const  cors = require ('cors')
const middleware = require('./utils/middleware')


const userRouter = require ('./routes/api/users') 
const loginRouter = require('./routes/api/login')
const itemRouter = require('./routes/api/items')
const app = express();


app.use(bodyParser.json())
app.use(cors())



const db = require('./config/config').MONGODB_URI

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log(error)
  })


  app.use('/api/users', userRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/items',itemRouter)
  app.use(middleware.errorHandler)

const port = process.env.port || 3000
app.listen( port, () => console.log(`server started on port ${port}`))