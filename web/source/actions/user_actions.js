
export const SET_USER = 'SET_USER'
export const setUser = (_id, email, password) => {
  return {
    type: SET_USER,
    _id: _id,
    email: email,
    password: password,
    connectionStatus: true
  }
}
