
const express = require('express')
const router = express.Router()

const passport = require('../config/passport.js')



router.post('/',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect()
    console.log(req.user.username)
  })


module.exports = router
