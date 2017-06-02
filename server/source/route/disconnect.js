
const express = require('express')
const router = express.Router()

const UserTokenModel = require('../model/userToken')
const logger = require('../config/winston_config')


router.get('/',
  function(req, res) {
    logger.info('DISCONNECTION [USER : ' + req.session.passport.user+']')
    UserTokenModel.find({ userId : req.session.passport.user }).remove().exec(
      function (err) {
        if (err) { logger.error(err); res.sendStatus(500) }
      }
    )

    res.sendStatus(200)

    // , function (err) {
    //   if (err) { logger.error(err); res.sendStatus(500) }
    //   // ExpenseModel.find({}).remove().exec(err => if (err) { logger.error(err); res.sendStatus(500)})
    //   logger.info('DISCONNECTION [USER : ' + req.session.passport.user+']')
    //   res.status(200)
    // })
  })

module.exports = router
