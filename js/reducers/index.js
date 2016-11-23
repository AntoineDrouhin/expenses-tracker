
import { combineReducers } from 'redux'
import expenses from './expenses'
import expensesTypes from './expensesTypes'

const expenseApp = combineReducers({
  expenses,
  expensesTypes
})

export default expenseApp
