
const express = require('express')
const router = express.Router()

const ExpenseModel = require('../model/expense.js')

router.route('/')
  .get((req, res) => {
    console.log('get expense')
    ExpenseModel.find(function (err, expenses) {
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
      expenseType: req.body.expenseType
    })
    expense.save(function (err, exp) {
      if (err) {
        console.log(err)
      } else {
        console.log('Expense saved, value : '+ expense.amount)
      }
      res.send(exp)
    })
  })
  .delete((req, res) => {
    console.log('delete expense')
    if (req.params.length < 1){
      ExpenseModel.find({}).remove().exec(err => console.log(err))
    } else {
      ExpenseModel.find(req.params[0]).remove().exec(err => console.log(err))
    }
    res.sendStatus(200)
  })

router.route('/:id')
  .get((req, res) => {
    console.log('get expense')
    ExpenseModel.findOne({_id: req.params.id},function (err, expenses) {
      if (err) return console.error(err)
      res.json(expenses)
    })
  })
  .delete((req, res) => {
    console.log('delete expense : id = ' + req.params.id)
    ExpenseModel.find({_id : req.params.id}).remove().exec(err => {
      console.log(err)
      if (err) res.sendStatus(500)
    })
    res.sendStatus(200)
  })

module.exports = router
