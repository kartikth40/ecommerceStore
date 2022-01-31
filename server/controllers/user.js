const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Coupon = require('../models/coupon')
const Order = require('../models/order')

exports.userCart = async (req, res) => {
  const { cart } = req.body

  let products = []

  const user = await User.findOne({ email: req.user.email }).exec()

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec()

  if (cartExistByThisUser) {
    cartExistByThisUser.remove()
    console.log('remove old cart')
  }

  let cartTotal = 0
  for (let i = 0; i < cart.length; i++) {
    let productObject = {}

    productObject.product = cart[i]._id
    productObject.count = cart[i].count
    productObject.color = cart[i].color

    // get price from DB for creating total
    let { price } = await Product.findById(cart[i]._id).select('price').exec()
    productObject.price = price

    cartTotal = cartTotal + price * cart[i].count

    products.push(productObject)
  }

  console.log('cartTotal -->', cartTotal)

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save()

  console.log('NEW CART SAVED -->', newCart)

  res.json({ ok: true })
}

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec()

  const { products, cartTotal, totalAfterDiscount } = cart

  res.json({ products, cartTotal, totalAfterDiscount })
}

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec()

  res.json(cart)
}

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec()

  res.json({ ok: true })
}

exports.getAddress = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()
  const address = user.address

  res.json(address)
}

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body

  const validCoupon = await Coupon.findOne({ name: coupon }).exec()
  if (!validCoupon) {
    return res.json({
      err: 'Invalid coupon',
    })
  }

  const discount = validCoupon.discount

  const user = await User.findOne({ email: req.user.email }).exec()

  let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price')
    .exec()

  let totalAfterDiscount = (cartTotal - (cartTotal * discount) / 100).toFixed(2)

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec()

  res.json({ totalAfterDiscount, discount })
}

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse
  const user = await User.findOne({ email: req.user.email }).exec()

  let { products } = await Cart.findOne({ orderedBy: user._id }).exec()

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save()

  // decrement quantity and increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }
  })

  let updated = Product.bulkWrite(bulkOption, {})
  console.log('QUANTITY-- AND SOLD++   -->', updated)

  res.json({ ok: true })
}

exports.getOrders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec()

  let userOrders = await Order.find({ orderedBy: user._id })
    .sort({ createdAt: -1 })
    .populate('products.product')
    .exec()

  res.json(userOrders)
}

exports.getOrder = async (req, res) => {
  let order = await Order.findOne({ _id: req.params.orderId })
    .populate('products.product')
    .exec()

  res.json({
    order,
  })
}

exports.addToWishlist = async (res, req) => {
  const { productId } = req.body

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec()

  res.json({ ok: true })
}

exports.wishlist = async (res, req) => {
  const list = await User.findOne({ email: req.user.email })
    .select('wishlist')
    .populate('wishlist')
    .exec()

  res.json(list)
}

exports.removeFromWishlist = async (res, req) => {
  const { productId } = req.params

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec()

  res.json({ ok: true })
}
