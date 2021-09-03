const express = require('express')
const router = express.Router()

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

//controller
const { create, read } = require('../controllers/product')

router.post('/product', authCheck, adminCheck, create) // (getURL, middleware, controller)
router.get('/products', read)

module.exports = router
