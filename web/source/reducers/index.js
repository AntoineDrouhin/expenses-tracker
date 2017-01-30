
import { combineReducers } from 'redux'
import expenses from './expenses'
import expensesTypes from './expensesTypes'
import userInformation from './userInformation'

const expenseApp = combineReducers({
  expenses,
  expensesTypes,
  userInformation
})

export default expenseApp
