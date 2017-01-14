
let nextExpenseTypeId = 0

export const addExpensetype = (label) => {
  return {
    type: 'ADD_EXPENSETYPE',
    id: nextExpenseTypeId++,
    label
  }
}

export const deleteExpensetype = (id) => {
  return {
    type: 'DELETE_EXPENSETYPE',
    id
  }
}
