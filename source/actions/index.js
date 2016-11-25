
// Expenses
let nextExpenseId = 0;

export const addExpense = (amount,expenseType) => {
  return {
    type: 'ADD_EXPENSE',
    id: nextExpenseId++,
    date: Date.now(),
    amount,
    expenseType
  }
}

export const deleteExpense = (id) => {
  return {
    type: 'DELETE_EXPENSE',
    id
  }
}

//ExpenseType
let nextExpenseTypeId = 0;

export const addExpensetype = (label) => {
  return {
    type: 'ADD_EXPENSETYPE',
    id: nextExpenseTypeId,
    label
  }
}

export const deleteExpensetype = (id) => {
  return {
    type: 'DELETE_EXPENSETYPE',
    id
  }
}
