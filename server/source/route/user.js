
const express = require('express')
const router = express.Router()
const UserModel = require('../model/user.js')

router.route('/')
  .post((req, res) => {
    console.log('post user : ' + req.body.email)
    const user = new UserModel({
      email: req.body.email,
      password: req.body.password, //TODO encrypt password
      token: 'token' //TODO generate session
    })
    user.save(function (err, room) {
      if (err) {
        console.log(err)
      }
      res.send(room)
    })
  })
  .get((req, res) => {
    console.log('get expense')
    UserModel.find(function (err, expenses) {
      if (err) return console.error(err)
      res.json(expenses)
    })
  })

// TODO : delete user

module.exports = router
