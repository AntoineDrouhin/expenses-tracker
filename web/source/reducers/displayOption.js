
import { USER_CREATION_ERROR, USER_CREATION_SUCCESS, REDIRECT_AFTER_LOGIN_SUCCESS } from '../actions/user_actions.js'

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

  case USER_CREATION_SUCCESS :
    return Object.assign( stateCopy ,
      { createUser : {error : false, creationSuccess: true ,errorMsg : ''}  }
    )

  case USER_CREATION_ERROR :
    return Object.assign( stateCopy ,
      { createUser : {error : true, creationSuccess: false ,errorMsg : action.errorMsg}  }
    )

  case REDIRECT_AFTER_LOGIN_SUCCESS :
    return Object.assign( stateCopy ,
      { createUser : {error : false, creationSuccess: false ,errorMsg : ''}  }
    )

  default:
    return state
  }
}


export default displayOption
