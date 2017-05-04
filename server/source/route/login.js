
const express = require('express')
const router = express.Router()

const passport = require('passport')

router.post('/',passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log('The user', req.user.email, 'is connected')

    var jsonres = {
      _id: req.user._id,
      email: req.user.email,
      connected: true,
      error: false
    }
    res.json(jsonres)
  })

module.exports = router
