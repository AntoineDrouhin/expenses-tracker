const mongoose = require('mongoose')

const expenseTypeModel = mongoose.model('ExpenseType', mongoose.Schema({
  label: {type : String, required : true}
})
)

module.exports = expenseTypeModel
