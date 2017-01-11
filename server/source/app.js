const express = require('express');

const app = express();
const mongoose = require('mongoose');
const mongodb_address = process.env.MONGODB_ADDRESS

if (!mongodb_address)
  throw "ERROR : .env file must specify a MONGODB_ADDRESS field"

mongoose.connect(mongodb_address);

const Expense = mongoose.model('Expense', mongoose.Schema({ amount: Number }) );

app.get('/', (req, res) => {
  res.send('\n\nHello, world!\n\n');
});


app.route('/expense')
  .get((req, res) => {
    Expense.find(function (err, expenses) {
      if (err) return console.error(err);
      res.json(expenses);
    })
  })
  .post((req, res) => {
    const expense = new Expense({ amount: 10 });
    expense.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Expense saved, value : '+ expense.amount);
      }
      res.sendStatus(200)
    });
  })
  .delete((req, res) => {
    Expense.find({}).remove().exec(err => console.log(err))
    res.sendStatus(200)
  })


module.exports = app;
