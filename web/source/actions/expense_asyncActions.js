import { addExpense, deleteExpense, setExpenses } from './expense_actions.js'

export const postExpense = (amount, expenseType, date) => {
    const expense = {
        amount,
        expenseType,
        date
    }
    return (dispatch) => {
        fetch(`${process.env.SERVER_ADDRESS}/expense`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(expense)
            }).then(response => response.json())
            .then(json => dispatch(addExpense(Object.assign({}, json))))
    }
}

export const removeExpense = (_id) => {
    return function(dispatch) {
        return fetch(`${process.env.SERVER_ADDRESS}/expense/${_id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    dispatch(deleteExpense(_id))
                }
            })
    }
}

export const fetchExpenses = () => {
    return function(dispatch) {
        return fetch(`${process.env.SERVER_ADDRESS}/expense`)
            .then(response => {
                const json = response.json()
                return json
            })
            .then(json => dispatch(setExpenses(json)))
    }
}
