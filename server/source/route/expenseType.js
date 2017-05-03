
const express = require('express')
const router = express.Router()

const ExpenseTypeModel = require('../model/expenseType.js')

router.route('/')
  .get((req, res) => {
    console.log('get expenseType')
    ExpenseTypeModel.find(function (err, expenseTypes) {
      if (err) {
        res.sendStatus(500)
        console.error(err)
        return
      }
      // res.sendStatus(200)
      res.json(expenseTypes)
    })
  })
  .post((req, res) => {
    console.log('post expenseType')
    const expense = new ExpenseTypeModel({
      label: req.body.label
    })
    expense.save(function (err, expType) {
      if (err) {
        console.log('Request error' + err.errors.label.name)
        res.send(err)
      } else {
        console.log('ExpenseType saved :' + expType)
        res.send({
          expenseType : expType,
          message : 'expenseType successfully added!'
        })
      }

    })
  })
  // .delete((req, res) => {
  //   console.log('delete expenseType')
  //   // if (req.params.length < 1){
  //   //   ExpenseTypeModel.find({}).remove().exec(err => console.log(err))
  //   // } else {
  //   ExpenseTypeModel.find(req.params[0]).remove().exec(err => console.log(err))
  //   // }
  //   res.sendStatus(200)
  // })

router.route('/:id')
  // .get((req, res) => {
  //   console.log('get expense')
  //   ExpenseModel.findOne({_id: req.params.id},function (err, expenses) {
  //     if (err) return console.error(err)
  //     res.json(expenses)
  //   })
  // })
  .delete((req, res) => {
    console.log('delete expense : id = ' + req.params.id)
    ExpenseTypeModel.find({_id : req.params.id}).remove().exec(err => {
      if (err) {
        res.send(404,{
          message : 'expenseType failed to delete',
          ok : 0
        })
        console.log('Error find delete/:id')
      }else{
        res.send({
          message : 'expenseType successfully deleted!',
          ok : 1
        })
      }
    })
  })

module.exports = router
