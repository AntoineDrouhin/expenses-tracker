import React, { PropTypes } from 'react'
import Expense from './Expense'

const ExpenseList = ({ expenses, onDeleteClick }) => (
  <ul>
    {expenses.map(expense =>
      <Expense
      key={expense.id}
      {...expense}
      onDeleteClick={onDeleteClick}
      />
    )}
  </ul>
)

ExpenseList.propTypes = {
  expenses : PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    expenseType: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired).isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default ExpenseList
