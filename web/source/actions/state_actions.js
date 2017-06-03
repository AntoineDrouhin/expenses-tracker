
const initialState = '../initialState'

export const RESET_STATE = 'RESET_STATE'
export const resetState = () => {
  return Object.assign( {type: RESET_STATE}, initialState)
}
