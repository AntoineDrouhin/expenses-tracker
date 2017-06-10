
const express = require('express')
const router = express.Router()
const UserModel = require('../model/user.js')

const logger = require('../config/winston_config')

const passwordHash = require('password-hash')

router.route('/')
  .post((req, res) => {
    logger.info('POST NEW USER :'+ req.body.email)
    UserModel.findOne({email: req.body.email}, function (err, user) {
      if (err) { logger.error(err); res.sendStatus(500) }
      if (user) {
        logger.info('USER : ' + req.body.email + ' ALREADY EXISTS')
        return res.send({error: true, errorMsg : 'User already exists'})
      }
      user = new UserModel({
        email: req.body.email, // TODO check email doesn't exist
        password: passwordHash.generate(req.body.password, {algorithm : 'sha256'}), 
      })
      user.save(function (err, user) {
        if (err) { logger.error(err); res.sendStatus(500) }
        req.app.mailer.send('usercreation_'+req.body.lang, {
          to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
          subject: 'Bienvenue sur Expense Tracker', // REQUIRED.
          mail:req.body.email // All additional properties are also passed to the template as local variables.
        }, function (err) {
          if (err) {
            // handle error
            console.log(err)
            logger.info('There was an error sending the email')
            return
          }
          logger.info('Email Sent')
        })
        res.send(user)
      })
    })
  })


// router.route('/:id')
//   .delete((req, res) => {
//     logger.info('DELETE USER :'+ req.params.id)
//     UserModel.find({ _id: req.params.id })
//       .remove()
//       .exec(err => {
//         if (err) { logger.error(err); res.sendStatus(500) }
//       })
//     res.sendStatus(200)
//   })

module.exports = router
