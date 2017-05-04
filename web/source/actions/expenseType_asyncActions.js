import { addExpenseType } from './expenseType_actions.js'
import {setExpensesType} from './expenseType_actions.js'

export const postExpenseType = (label) => {
  const expenseType = {
    label
  }
  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/expenseType`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(expenseType)
    }).then(response => response.json())
      .then(json => dispatch(addExpenseType(json.expenseType.label, json.expenseType._id)))
  }

}

export const fetchExpenseTypes = () => {
  return function(dispatch) {
    return fetch(`${process.env.SERVER_ADDRESS}/expenseType`)
            .then(response => response.json() )
            .then(json => dispatch(setExpensesType(json)))
  }
}
