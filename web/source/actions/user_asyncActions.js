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
    }).then(response => response.json())
        .then(json => dispatch(setUser(Object.assign({}, json))))
        // TODO error if user already exists
  }
}

export const login = (email, password) => {
  const user = {
    email,
    password
  }
  return (dispatch) => {
    fetch(`${process.env.SERVER_ADDRESS}/user/${email}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(password)
    }).then(response => response.json())
        .then(json => dispatch(setUser(Object.assign({}, json))))
  }
}
//
// export const fetchExpenses = () => {
//   return function(dispatch) {
//     return fetch(`${process.env.SERVER_ADDRESS}/expense`)
//             .then(response => {
//               const json = response.json()
//               return json
//             })
//             .then(json => dispatch(setExpenses(json)))
//   }
// }
