const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Coupon = require('../models/coupon')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = async (req, res) => {
  // find user
  const user = await User.findOne({ email: req.user.email }).exec()

  // get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec()

  const { couponApplied } = req.body
  let finalAmount = cartTotal * 100
  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100
  }

  // create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: 'inr',
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  })
}
