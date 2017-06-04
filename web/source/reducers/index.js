
import { combineReducers } from 'redux'
import expenses from './expenses'
import expensesTypes from './expensesTypes'
import user from './user'
import global_state from './global_state'

import initialState from '../initialState'

const rootReducer = function(state, action) {
  if (action.type === 'RESET_STATE') {
    state = initialState
  }
  return appReducer(state, action)
}

const appReducer = combineReducers({
  expenses,
  expensesTypes,
  user,
  global_state
})

export default rootReducer
