const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth')

//db
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB CONNECTED.'))
  .catch((err) => console.log(`DB CONNECTION ERROR ${err}`))

//app
const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(cors())

//routes middlewares
app.use('/api', authRoutes)

//port
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
