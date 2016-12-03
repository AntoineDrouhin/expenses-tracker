import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import expenseApp from './reducers'
import App from './components/App'

require("./style/Bootstrap-v3.3.6.css");

const initialState = {
    expenses : [{
      id: 99,
      date: Date.now(),
      amount: 75,
      expenseType: 'Food',
    },
    {
      id: 98,
      date: Date.now(),
      amount: 255,
      expenseType: 'Tools',
    }],
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

let store = createStore(expenseApp, initialState)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
