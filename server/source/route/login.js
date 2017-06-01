
const passport = require('passport')
const express = require('express')
const router = express.Router()
const issueToken = require('../service/issueToken')
const UserModel = require('../model/user')

router.post('/',passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log('The user', req.user.email, 'is connected')


    UserModel.findOne({ email : req.user.email }, function (err, user) {
      if (err) { res.send(err) }
      if (!user) { res.send('unknown user') }

      issueToken(user, function(err, token) {
        console.log('login.js => Errror ? ' + err)
        if (err) { res.send(err) }
        // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })

        // res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true })

        console.log('LOGIN ISSUETOKEN CALLBACK => SERVER_ADDRESS : ', process.env.SERVER_ADDRESS +  process.env.HTTPS_PORT)

        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 })

        console.log('cookie created successfully')

        var jsonres = {
          _id: user._id,
          email: user.email,
          connected: true,
          error: false
        }

        console.log('JSONRES', jsonres)

        res.json(jsonres)
      })
    })
  })

module.exports = router
