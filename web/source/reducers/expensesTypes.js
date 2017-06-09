
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

const expensesTypes = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_EXPENSETYPE':
    return {
      inInit : state.isInit,
      item :[
        ...state.items,
        expenseType(undefined, action)]
    }
  case 'DELETE_EXPENSETYPE':
    return {
      items : state.items.filter(expenseType => expenseType.id !== action.id ),
      isInit : state.isInit
    }


  case 'SET_EXPENSETYPE':
    return {
      items : action.expenseTypes,
      isInit : true
    }

  default:
    return state
  }
}

export default expensesTypes
