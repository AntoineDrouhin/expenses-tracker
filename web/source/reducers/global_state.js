import { RESET_STATE } from '../actions/state_actions.js'


const global_state = (state = {}, action) => {

  let stateCopy = Object.assign({}, state)

  switch (action.type) {
  case RESET_STATE:
    return Object.assign( stateCopy,
      { expenseError : action.error }
    )

  default:
    return state
  }
}


export default global_state
