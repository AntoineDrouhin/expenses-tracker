
const express = require('express')
const router = express.Router()
const UserModel = require('../model/user.js')

router.route('/')
  .post((req, res) => {
    console.log('post user : ' + req.body.email)
    const user = new UserModel({
      email: req.body.email,
      password: req.body.password, //TODO encrypt password
      expenseType: 'token' //TODO generate session
    })
    user.save(function (err, room) {
      if (err) {
        console.log(err)
      }
      res.send(room)
    })
  })

// TODO : delete user

module.exports = router
