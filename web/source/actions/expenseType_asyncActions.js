import { addExpenseType,deleteExpenseType } from './expenseType_actions.js'
import {setExpensesType} from './expenseType_actions.js'

export const postExpenseType = (label) => {
  const expenseType = {
    label
  }
  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/expenseType`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(expenseType)
    }).then(response => response.json())
      .then(json => dispatch(addExpenseType(json.expenseType.label, json.expenseType._id)))
  }

}

export const fetchExpenseTypes = () => {
  return function(dispatch) {
    return fetch(`${process.env.SERVER_ADDRESS}/expenseType`, {
      credentials: 'include'
    })
            .then(response => response.json() )
            .then(json => dispatch(setExpensesType(json)))
  }
}

export const deleteAsyncExpenseType = (_id) => {
  return function(dispatch) {
    return fetch(`${process.env.SERVER_ADDRESS}/expenseType/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: new Headers({'Content-Type': 'application/json'})
    })
      .then(response => {
        if (response.ok) {
          dispatch(deleteExpenseType(_id))
        }
      })
  }
}
