import React from 'react'
import AddExpense from '../containers/AddExpense'
import MonthlyExpenseList from '../containers/MonthlyExpenseList'
import CenterPanel from './CenterPanel'

const App = () => {

  return (
    <CenterPanel >

      <AddExpense />

      <MonthlyExpenseList />
    </CenterPanel>
  )

}
export default App
