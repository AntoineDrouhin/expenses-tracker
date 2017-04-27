
import { combineReducers } from 'redux'
import expenses from './expenses'
import expensesTypes from './expensesTypes'
import user from './user'

const expenseApp = combineReducers({
  expenses,
  expensesTypes,
  user
})

export default expenseApp
