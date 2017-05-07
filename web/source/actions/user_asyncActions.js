import { setUser } from './user_actions.js'

export const postUser = (email, password) => {
  const user = {
    email,
    password
  }
  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/user`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    })//.then(response => response.json())
      //.then(json => /* dispatch(setUser(Object.assign({}, json)))*/)
      // TODO return to login page if no error
      // TODO error if user already exists
  }
}

// TODO Delete users

export const login = (username, password) => {
  const user = {
    username, // attention username = email, mais coté server à cause du champs par defaut username choisi par le middleware ca pose probleme : à corriger
    password
  }

  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/login`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    }).then(response => response.json())
      .then(user => dispatch(setUser(Object.assign({}, user))))
      .catch(function() {
        dispatch(setUser({_id:false,email:false,connected:false, error:true}))
      })
  }
}
