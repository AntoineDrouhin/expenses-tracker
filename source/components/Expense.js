import React, { PropTypes } from 'react'
import {Glyphicon, Button} from 'react-bootstrap'

const Expense = ({onDeleteClick, expenseType, amount, expenseDate}) => (
  <tr>
    <td>{expenseType}</td>
    <td>{expenseDate}</td>
    <td style={{fontWeight: 'bold'}}>{amount}</td>
    <td onClick={onDeleteClick}></td>
    <Button bsStyle="danger" >
      <Glyphicon glyph="remove" />
    </Button >
  </tr>
)

Expense.propTypes = {
  onDeleteClick : PropTypes.func.isRequired,
  date : PropTypes.number.isRequired,
  expenseType : PropTypes.string.isRequired,
  amount : PropTypes.number.isRequired
}

export default Expense
