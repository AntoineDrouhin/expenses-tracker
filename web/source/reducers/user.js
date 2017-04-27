
import { SET_USER } from '../actions/user_actions.js'

const user = (state = {}, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      _id: action._id,
      email: action.email,
      password: action.password,
      connectionStatus: true
    }

  default:
    return state
  }
}

export default user
