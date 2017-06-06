
import { combineReducers } from 'redux'
import expenses from './expenses'
import expensesTypes from './expensesTypes'
import user from './user'
import displayOption from './displayOption'

const expenseApp = combineReducers({
  expenses,
  expensesTypes,
  user,
  displayOption
})

export default expenseApp
