import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import expenseApp from './reducers'
import App from './containers/App'
import Login from './containers/Login'
import CreateUser from './containers/CreateUser'
import { Router, Route, browserHistory } from 'react-router'

import { fetchExpenseTypes } from './actions/expenseType_asyncActions.js'
import { fetchExpenses } from './actions/expense_asyncActions.js'
import { checkAuthentication } from './actions/user_asyncActions.js'

require('./style/Bootstrap-v3.3.6.css')  /*eslint:ignore*/

const initialState = {
  expenses : [],
  expensesTypes: [],
  displayOptions : {
    displayModal : false
  }
}

const store = createStore(
  expenseApp,
  initialState,
  compose(
    applyMiddleware( thunkMiddleware ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.dispatch(checkAuthentication())
store.dispatch(fetchExpenses())
store.dispatch(fetchExpenseTypes())


render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={CreateUser} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
