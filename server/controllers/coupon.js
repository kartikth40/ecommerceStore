const Coupon = require('../models/coupon')

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body
    const newCoupon = await new Coupon({ name, expiry, discount }).save()
    res.json(newCoupon)
  } catch (err) {
    console.log(err)
  }
}

exports.remove = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.couponId).exec()
    res.json(deleted)
  } catch (err) {
    console.log(err)
  }
}

exports.list = async (req, res) => {
  try {
    list = await Coupon.find({}).sort({ createdAt: -1 }).exec()
    res.json(list)
  } catch (err) {
    console.log(err)
  }
}
