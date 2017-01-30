
const userInformation = (state = {}, action) => {
  switch (action.type) {
  case 'SET_USERINFORMATION':
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

export default userInformation
