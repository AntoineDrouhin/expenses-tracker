
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
