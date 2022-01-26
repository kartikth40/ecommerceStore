const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Coupon = require('../models/coupon')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calc price

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'inr',
  })
  console.log('PAY -> ', paymentIntent.client_secret)

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
}
