
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const addExpense = ( expense ) => {
  return Object.assign({}, { type: ADD_EXPENSE }, expense)
}

export const DELETE_EXPENSE = 'DELETE_EXPENSE'
export const deleteExpense = (_id) => {
  return {
    type: DELETE_EXPENSE,
    _id
  }
}

export const SET_EXPENSES = 'SET_EXPENSES'
export const setExpenses = (expenses) => {
  return {
    type: SET_EXPENSES,
    expenses
  }
  //TODO do like ADD_EXPENSES(Object.assign)
}

export const SET_EXPENSE_ERROR = 'SET_EXPENSE_ERROR'
export const setExpenseERROR = (expenseError) => {
  return {
    type: SET_EXPENSE_ERROR,
    expenseError
  }
}
