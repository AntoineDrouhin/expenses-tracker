
const express = require('express')
const router = express.Router()

const passport = require('passport')

router.post('/',passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json({connected:true, user: req.user});
  })


module.exports = router
