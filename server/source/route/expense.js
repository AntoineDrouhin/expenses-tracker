
const express = require('express')
const router = express.Router()

const ExpenseModel = require('../model/expense.js')

router.route('/')
  .get((req, res) => {
    console.log('get expense')
    ExpenseModel.find({ '_user': req.session.passport.user },function (err, expenses) {
      if (err) return console.error(err)
      res.json(expenses)
    })
  })
  .post((req, res) => {
    console.log('post expense', req.body, req.params)
    console.dir(req.body)
    const expense = new ExpenseModel({
      date: req.body.date,
      amount: req.body.amount,
      expenseType: req.body.expenseType,
      _user: req.session.passport.user
    })
    expense.save(function (err, room) {
      if (err) {
        console.log(err)
      } else {
        console.log('Expense saved, value : '+ expense.amount)
      }
      res.send(room)
    })
  })


router.route('/:id')
  // ---Not use at the moment---
  // .get((req, res) => {
  //   console.log('get expense')
  //   ExpenseModel.findOne({_id: req.params.id},function (err, expenses) {
  //     if (err) return console.error(err)
  //     res.json(expenses)
  //   })
  // })
  .delete((req, res) => {
    console.log('delete expense : id = ' + req.params.id)
    ExpenseModel.find({_id : req.params.id, _user:req.session.passport.user}).remove().exec(err => {
      console.log(err)
      if (err) res.sendStatus(500)
    })
    res.sendStatus(200)
  })

module.exports = router
