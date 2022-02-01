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
  getAddress,
  applyCouponToUserCart,
  createOrder,
  getOrders,
  getOrder,
  addToWishlist,
  wishlist,
  removeFromWishlist,
} = require('../controllers/user')

router.post('/user/cart', authCheck, userCart) // save cart
router.get('/user/cart', authCheck, getUserCart) // get cart
router.delete('/user/cart', authCheck, emptyCart) // empty cart

router.post('/user/wishlist', authCheck, addToWishlist) // save in wishlist
router.get('/user/wishlist', authCheck, wishlist) // get wishlist
router.delete('/user/wishlist/:productId', authCheck, removeFromWishlist) // remove product from wishlist

router.post('/user/address', authCheck, saveAddress) // save address
router.get('/user/address', authCheck, getAddress) // get address

router.post('/user/cart/coupon', authCheck, applyCouponToUserCart) // apply coupon

router.post('/user/order', authCheck, createOrder) // create order after successful purchase
router.get('/user/orders', authCheck, getOrders) // get all orders
router.get('/user/orderDetails/:orderId', authCheck, getOrder) // get particular order

module.exports = router
