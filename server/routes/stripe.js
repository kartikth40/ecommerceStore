const express = require('express')
const router = express.Router()

// middlewares
const { authCheck } = require('../middlewares/auth')

// controllers
const { createPaymentIntent } = require('../controllers/stripe')

router.post('/create-payment-intent', authCheck, createPaymentIntent)

module.exports = router
