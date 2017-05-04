
const expenseType = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_EXPENSETYPE':
    return {
      _id: action._id,
      label: action.label
    }

  default:
    return state
  }
}

const expensesTypes = (state = [], action) => {
  switch (action.type) {
  case 'ADD_EXPENSETYPE':
    return [
      ...state,
      expenseType(undefined, action)
    ]
  case 'DELETE_EXPENSETYPE':
    return state.filter(expenseType => expenseType.id !== action.id )

  case 'SET_EXPENSETYPE':
    return action.expenseTypes

  default:
    return state
  }
}

export default expensesTypes
