const expense = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_EXPENSE':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })

    default:
      return state
  }
}

export default expense
