import React, { PropTypes } from 'react'


const Expense = ({onDeleteClick, expenseType, amount, expenseDate}) => (
  <li>
    <span style={{textAlign: 'left'}}>{expenseType}</span>
    <span style={{textAlign: 'center'}}>{expenseDate}</span>
    <span style={{textAlign: 'right', fontWeight: 'bold'}}>{amount}</span>
    <span style={{textAlign: 'right'}} onClick={onDeleteClick}>Delete</span>
  </li>
)

Expense.propTypes = {
  onDeleteClick : PropTypes.func.isRequired,
  date : PropTypes.number.isRequired,
  expenseType : PropTypes.string.isRequired,
  amount : PropTypes.number.isRequired
}

export default Expense
