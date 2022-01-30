const Order = require('../models/order')

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate('products.product')
    .exec()

  res.json(allOrders)
}

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body

  if (orderStatus === 'Shipped') {
    let currentDate = new Date()

    let shipDateupdate = await Order.findByIdAndUpdate(
      orderId,
      { deliveryDate: currentDate },
      { new: true }
    ).exec()
  }

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec()

  res.json(updated)
}
