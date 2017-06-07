
const displayOption = (state = {}, action) => {
  let stateCopy = Object.assign({}, state)

  switch (action.type) {
  case 'SET_DISPLAYMODAL_TRUE':
    return Object.assign( stateCopy ,
      { displayModal : true }
    )

  case 'SET_DISPLAYMODAL_FALSE':
    return Object.assign( stateCopy ,
      { displayModal : false}
    )

  default:
    return state
  }
}


export default displayOption
