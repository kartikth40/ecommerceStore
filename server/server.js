const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

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
// example - importing auth file from routes. The same will be done to all the files in routes by fs module
// const authRoutes = require('./routes/auth')
// app.use('/api', authRoutes)
fs.readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

//port
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
