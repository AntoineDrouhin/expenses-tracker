
const express = require('express')
const router = express.Router()

const ExpenseTypeModel = require('../model/expenseType.js')
const logger = require('../config/winston_config.js')

router.route('/')
  .get((req, res) => {
    logger.info('user : ' + req.session.passport.user + ' GET ALL EXPENSETYPES')
    ExpenseTypeModel.find(function (err, expenseTypes) {
      if (err) { logger.error(err); res.sendStatus(500) }
      res.json(expenseTypes)
    })
  })
  .post((req, res) => {
    logger.info('user : ' + req.session.passport.user + ' POST EXPENSETYPE :', req.body)
    const expense = new ExpenseTypeModel({
      label: req.body.label
    })
    expense.save(function (err, expType) {
      if (err) { logger.error(err); res.sendStatus(500) }
      res.send({
        expenseType : expType,
        message : 'expenseType successfully added!'
      })
    })
  })

router.route('/:id')
  .delete((req, res) => {
    logger.info('user : ' + req.session.passport.user + ' DELETE EXPENSETYPES :', req.params.id)
    ExpenseTypeModel.find({_id : req.params.id}).remove().exec(err => {
      if (err) { logger.error(err); res.sendStatus(500) }
      res.send({
        message : 'expenseType successfully deleted!',
        ok : 1
      })
    })
  })

module.exports = router
