
export const SET_USER = 'SET_USER'
export const setUser = (json) => {
  return {
    type: SET_USER,
    _id: json.user._id,
    email: json.user.email,
    connectionStatus: json.connected
  }
}
