const admin = require('../firebase')
const User = require('../models/user')
exports.authCheck = async (req, res, callback) => {
  // console.log(req.headers) //token
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
    req.user = firebaseUser
    callback()
  } catch (err) {
    console.log(err)
    res.status(401).json({
      err: 'Invalid or expired Token',
    })
  }
}

exports.adminCheck = async (req, res, callback) => {
  const { email } = req.user // getting this req value from authCheck

  const adminUser = await User.findOne({ email: email }).exec()

  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: 'Admin resource. Access denied.',
    })
  } else {
    callback()
  }
}
