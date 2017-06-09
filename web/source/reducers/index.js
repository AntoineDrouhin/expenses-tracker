
import { combineReducers } from 'redux'
import expenses from './expenses'
import expenseTypes from './expenseTypes'
import user from './user'

import displayOption from './displayOption'
import lang from './lang'
import initialState from '../initialState'

const rootReducer = function(state, action) {
  if (action.type === 'RESET_STATE') {
    state = initialState
  }
  return appReducer(state, action)
}

const appReducer = combineReducers({
  expenses,
  expenseTypes,
  user,
  lang,
  displayOption
})

export default rootReducer
