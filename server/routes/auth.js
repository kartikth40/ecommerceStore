const express = require('express')
const router = express.Router()

//middlewares
const { authCheck } = require('../middlewares/auth')

//controller
const { createOrUpdateUser, currentUser } = require('../controllers/auth')

router.post('/create-or-update-user', authCheck, createOrUpdateUser) // (getURL, middleware, controller)
router.post('/current-user', authCheck, currentUser)

module.exports = router
