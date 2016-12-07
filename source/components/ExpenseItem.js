import React, { PropTypes } from 'react'
import {Glyphicon, Button} from 'react-bootstrap'

const ExpenseItem = ({onDeleteClick, expenseType, amount, expenseDate}) => (
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

ExpenseItem.propTypes = {
  onDeleteClick : PropTypes.func.isRequired,
  date : PropTypes.number.isRequired,
  expenseType : PropTypes.string.isRequired,
  amount : PropTypes.number.isRequired
}

export default ExpenseItem
