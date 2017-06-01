
const express = require('express')
const router = express.Router()
const UserModel = require('../model/user.js')

router.route('/')
  .post((req, res) => {
    console.log('post user : ' + req.body.email)
    const user = new UserModel({
      email: req.body.email, // TODO check email doesn't exist
      password: req.body.password, //TODO encrypt password
    })
    user.save(function (err, user) {
      if (err) {
        console.log(err)
      }
      res.send(user)
    })
  })
  .get((req, res) => {
    console.log('get user')
    UserModel.find(function (err, expenses) {
      if (err) return console.error(err)
      res.json(expenses)
    })
  })


router.route('/:id')
  .delete((req, res) => {
    console.log('delete user :' + req.params.id)
    UserModel.find({ _id: req.params.id })
      .remove()
      .exec(err => {
        console.log(err)
        if (err) res.sendStatus(500)
      })
    res.sendStatus(200)
  })

module.exports = router
