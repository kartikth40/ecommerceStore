const admin = require('../firebase')

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
