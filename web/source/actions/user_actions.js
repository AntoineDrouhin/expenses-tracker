
export const SET_USER = 'SET_USER'
export const setUser = (user) => {
  return {
    type: SET_USER,
    _id: user._id,
    email: user.email,
    connected: user.connected,
    error: user.error
  }
}

export const USER_CREATION_ERROR = 'USER_CREATION_ERROR'
export const userCreationError = (errorMsg) => {
  return {
    type : USER_CREATION_ERROR,
    errorMsg
  }
}

export const USER_CREATION_SUCCESS = 'USER_CREATION_SUCCESS'
export const userCreationSuccess = () => {
  return {
    type : USER_CREATION_SUCCESS
  }
}

export const REDIRECT_AFTER_LOGIN_SUCCESS = 'REDIRECT_AFTER_LOGIN_SUCCESS'
export const redirectAfterLoginSuccess = () => {
  return { type : REDIRECT_AFTER_LOGIN_SUCCESS }
}
