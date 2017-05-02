
const express = require('express')
const router = express.Router()

const passport = require('passport')

router.post('/',passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("The user", req.user.email, "is connected");
    res.json({connected:true, user: req.user})
  })

// TODO : working login


module.exports = router
