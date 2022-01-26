const express = require('express')
const router = express.Router()

// middlewares
const { authCheck } = require('../middlewares/auth')

// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
} = require('../controllers/user')

router.post('/user/cart', authCheck, userCart) // save cart
router.get('/user/cart', authCheck, getUserCart) // get cart
router.delete('/user/cart', authCheck, emptyCart) // empty cart
router.post('/user/address', authCheck, saveAddress) // save address

router.post('/user/cart/coupon', authCheck, applyCouponToUserCart) // apply coupon

router.post('/user/order', authCheck, createOrder) // create order after successful purchase

module.exports = router
