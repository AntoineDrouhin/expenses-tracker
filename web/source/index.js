import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { fetchExpenses } from './actions'
import expenseApp from './reducers'
import App from './components/App'

require("./style/Bootstrap-v3.3.6.css");

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
    }]
};

// const store = createStore(expenseApp, initialState)
const store = createStore(
  expenseApp,
  initialState,
  compose(
    applyMiddleware( thunkMiddleware ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.dispatch(fetchExpenses()).then(() =>
  console.log(store.getState())
)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
