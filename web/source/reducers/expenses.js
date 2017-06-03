import { SET_EXPENSES, ADD_EXPENSE, SET_EXPENSE_ERROR } from '../actions/expense_actions.js'

const expense = (state = {}, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      _id: action._id,
      date: action.date,
      amount: action.amount,
      expenseType : action.expenseType
    }

  default:
    return state
  }
}

const expenses = (state = {}, action) => {

  let stateCopy = Object.assign({}, state)

  switch (action.type) {
  case 'ADD_EXPENSE':
    return Object.assign( stateCopy ,
      { expenseList : state.expenseList.concat(expense(undefined, action)) }
    )

  case 'DELETE_EXPENSE':
    return Object.assign( stateCopy ,
      { expenseList : state.expenseList.filter(expense => expense._id !== action._id ) }
    )

  case SET_EXPENSES:
    return Object.assign( stateCopy ,
      { expenseList : action.expenses,
        isInit : true}
    )

  case SET_EXPENSE_ERROR:
    return Object.assign( stateCopy,
      { expenseError : action.error }
    )

  default:
    return state
  }
}


export default expenses
