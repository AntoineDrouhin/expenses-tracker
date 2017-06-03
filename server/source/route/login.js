
const passport = require('passport')
const express = require('express')
const router = express.Router()
const issueToken = require('../service/issueToken')
const UserModel = require('../model/user')
const logger = require('../config/winston_config')


router.post('/',passport.authenticate('local'),
  function(req, res) {
    UserModel.findOne({ email : req.user.email }, function (err, user) {
      if (err) { logger.error(err); res.sendStatus(500) }
      if (!user) { logger.info('Failed connection attempt -- email : ' + req.user.email); res.send('unknown user') }

      issueToken(user, function(err, token) {
        if (err) { logger.error(err); res.sendStatus(500) }

        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 })

        var jsonres = {
          _id: user._id,
          email: user.email,
          connected: true,
          error: false
        }

        logger.info('USER LOGIN --- email : '+ user.email)
        res.json(jsonres)
      })
    })
  })

module.exports = router
