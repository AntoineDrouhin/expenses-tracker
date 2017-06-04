const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseModel = mongoose.model('Expense', mongoose.Schema({
  date: Date,
  amount: Number,
  expenseType: String,
  _user : { type: Schema.ObjectId, ref: 'user' }
})
)

module.exports = expenseModel
