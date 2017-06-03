
const express = require('express')
const router = express.Router()

const ExpenseModel = require('../model/expense.js')
const logger = require('../config/winston_config.js')

router.route('/')
  .get((req, res) => {
    logger.info('user : ' + req.session.passport.user + ' GET ALL EXPENSES')
    ExpenseModel.find(function (err, expenses) {
      if (err) { logger.error(err); res.sendStatus(500) }
      res.json(expenses)
    })
  })
  .post((req, res) => {
    logger.info('user : ' + req.session.passport.user + ' POST EXPENSE :', req.body)
    const expense = new ExpenseModel({
      date: req.body.date,
      amount: req.body.amount,
      expenseType: req.body.expenseType
    })
    expense.save(function (err, room) {
      if (err) { logger.error(err); res.sendStatus(500) }
      res.send(room)
    })
  })
  // .delete((req, res) => {
  //   logger.info('user : ' + req.session.passport.user + ' Delete all expenses')
  //   if (req.params.length < 1){
  //     ExpenseModel.find({}).remove().exec(err => if (err) { logger.error(err); res.sendStatus(500)})
  //   } else {
  //     ExpenseModel.find(req.params[0]).remove().exec(err => if (err) { logger.error(err); res.sendStatus(500)})
  //   }
  //   res.sendStatus(200)
  // })

router.route('/:id')
  .get((req, res) => {
    logger.info('user : ' + req.session.passport.user + ' GET EXPENSE :' + req.params.id)
    ExpenseModel.findOne({_id: req.params.id},function (err, expenses) {
      if (err) { logger.error(err); res.sendStatus(500) }
      res.json(expenses)
    })
  })
  .delete((req, res) => {
    logger.info('user : ' + req.session.passport.user + ' DELETE EXPENSE :' + req.params.id)
    ExpenseModel.findOne({_id : req.params.id}).remove().exec(err => {
      if (err) { logger.error(err); res.sendStatus(500) }
    })
    res.sendStatus(200)
  })

module.exports = router
