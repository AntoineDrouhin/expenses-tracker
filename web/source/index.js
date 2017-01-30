import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import expenseApp from './reducers'
import App from './containers/App'
import Login from './components/Login'
import { Router, Route, browserHistory } from 'react-router'

import { fetchExpenses } from './actions/expense_asyncActions.js'

require('./style/Bootstrap-v3.3.6.css')  /*eslint:ignore*/

const initialState = {
  expenses : [],
  expensesTypes: [{
    id: 0,
    label: 'Food'
  }, {
    id: 1,
    label: 'Tools'
  }, {
    id: 2,
    label: 'Clothes'
  }],
  userInformation:{
    email: 'label@domain.com',
    password: 'label@domain.com',
    connectionStatus: true
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

store.dispatch(fetchExpenses())

render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
