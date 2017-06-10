import { setUser, userCreationError, userCreationSuccess } from './user_actions.js'
import { resetState } from './state_actions.js'

export const postUser = (email, password, lang) => {
  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/user`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({email, password, lang})
    })
      .then(response => response.json())
      .then(json => {
        if ( json.error ) {
          dispatch(userCreationError(json.errorMsg))
        }
        else {
          dispatch(userCreationSuccess())
        }
      })

  }
}

// TODO Delete users

export const login = (email, password) => {
  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({email, password})
    })
      .then(response => response.json())
      .then(user => dispatch(setUser(Object.assign({}, user))))
      .catch(() => dispatch(setUser({_id: null, email: null, connected: false,error: true})))
  }
}

export const checkAuthentication = function () {
  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/checkauth`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(user => dispatch(setUser(Object.assign({}, user))))
  }
}

export const disconnect = function () {
  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/disconnect`, {
      credentials: 'include'
    })
    .then( () => {
      dispatch(resetState())
    })
  }
}
