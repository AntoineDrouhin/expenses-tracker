
const passport = require('passport')
const express = require('express')
const router = express.Router()
const issueToken = require('../service/issueToken')

router.post('/',passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log('The user', req.user.email, 'is connected')

    issueToken(req.user, function(err, token) {
      if (err) { res.send(err) }
      res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 })

      var jsonres = {
        _id: req.user._id,
        email: req.user.email,
        connected: true,
        error: false
      }

      res.send(jsonres)
      
    })
  })
  //
  // function issueToken(user, done) {
  //   var token = utils.randomString(64)
  //   console.log('issueToken', token)
  //   saveRememberMeToken(token, user.id, function(err) {
  //     if (err) { return done(err) }
  //     return done(null, token)
  //   })
  // }


module.exports = router
