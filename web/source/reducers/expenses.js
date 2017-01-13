import { SET_EXPENSES } from '../actions'

const expense = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        id: action.id,
        date: action.date,
        amount: action.amount,
        expenseType : action.expenseType
      }

    default:
      return state
  }
}

const expenses = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        expense(undefined, action)
      ]
    case 'DELETE_EXPENSE':
      return state.filter( expense => expense.id !== action.id )

    case SET_EXPENSES:
      return action.expenses

    default:
      return state
  }
}

export default expenses
