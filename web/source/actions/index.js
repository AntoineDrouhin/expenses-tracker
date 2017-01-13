
// Expenses
let nextExpenseId = 0;

export const ADD_EXPENSE = 'ADD_EXPENSE'
export const addExpense = ( expense ) => {
  return Object.assign({ type: ADD_EXPENSE }, expense)
}



export const postExpense = (amount, expenseType, date) => {
  const expense = {amount, expenseType, date}

  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/expense`, {
      method: "POST",
      headers : new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(expense)
    }).then(response => response.json())
    .then(json => dispatch(addExpense(Object.assign({}, json) ) ) )

  }
}

export const DELETE_EXPENSE = 'DELETE_EXPENSE'
export const deleteExpense = (id) => {
  return {
    type: DELETE_EXPENSE,
    id
  }
}

export const fetchExpenses = () => {
  return function (dispatch) {
    return fetch(`${process.env.SERVER_ADDRESS}/expense`)
    .then(response => {
       const json = response.json()
       console.log(json)
       return json
    })
    .then(json => dispatch(setExpenses(json)) )
  }
}

export const SET_EXPENSES = 'SET_EXPENSES'
export const setExpenses = (expenses) => {
  return {
    type: SET_EXPENSES,
    expenses
  }
}

//
// export const REQUEST_EXPENSES = 'REQUEST_EXPENSES'
// export function requestExpense() {
//   return {
//     type: REQUEST_EXPENSES
//   }
// }
//
// export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES'
// export function receiveExpense(json) {
//   return {
//     type: RECEIVE_EXPENSES,
//     expenses: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }


//ExpenseType
let nextExpenseTypeId = 0;

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
