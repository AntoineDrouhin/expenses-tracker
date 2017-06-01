
const express = require('express')
const router = express.Router()
const UserModel = require('../model/user.js')

const logger = require('../config/winston_config')

router.route('/')
  .post((req, res) => {
    logger.info('POST NEW USER :'+ req.body.email)
    const user = new UserModel({
      email: req.body.email, // TODO check email doesn't exist
      password: req.body.password, //TODO encrypt password
    })
    user.save(function (err, user) {
      if (err) { logger.error(err); res.sendStatus(500) }
      res.send(user)
    })
  })

router.route('/:id')
  .delete((req, res) => {
    logger.info('DELETE USER :'+ req.params.id)
    UserModel.find({ _id: req.params.id })
      .remove()
      .exec(err => {
        if (err) { logger.error(err); res.sendStatus(500) }
      })
    res.sendStatus(200)
  })

module.exports = router
