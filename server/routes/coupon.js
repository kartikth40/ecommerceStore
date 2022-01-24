const express = require('express')
const router = express.Router()

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

//controller
const { create, remove, list } = require('../controllers/coupon')

router.post('/coupon', authCheck, adminCheck, create) // (getURL, middleware, controller)
router.get('/coupons', list)
router.delete('/coupon/:couponId', authCheck, adminCheck, remove)

module.exports = router
