const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')

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
