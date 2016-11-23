
const expenseType = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPENSETYPE':
      return {
        id: action.id,
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

    default:
      return state
  }
}

export default expensesTypes
