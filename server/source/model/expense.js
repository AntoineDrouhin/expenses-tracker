const mongoose = require('mongoose');

const expenseModel = mongoose.model('Expense', mongoose.Schema({
  date: Date,
  amount: Number,
  expenseType: String
})
);

module.exports = expenseModel;
