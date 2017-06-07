
export const ADD_EXPENSETYPE = 'ADD_EXPENSETYPE'
export const addExpenseType = (label,_id) => {
  return {
    type: ADD_EXPENSETYPE,
    _id,
    label
  }
}

export const deleteExpenseType = (id) => {
  return {
    type: 'DELETE_EXPENSETYPE',
    id
  }
}

export const SET_EXPENSETYPE = 'SET_EXPENSETYPE'
export const setExpensesType = (expenseTypes) => {
  return {
    type: SET_EXPENSETYPE,
    expenseTypes
  }
}
