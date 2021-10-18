const express = require('express')
const router = express.Router()

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

//controller
const { create, listAll, remove } = require('../controllers/product')

router.post('/product', authCheck, adminCheck, create) // (getURL, middleware, controller)
router.get('/products/:count', listAll)
router.delete('/product/:slug', authCheck, adminCheck, remove)

module.exports = router
