import React, { PropTypes } from 'react'
import {Glyphicon, Button} from 'react-bootstrap'

const ExpenseItem = (props) => {

  return (
    <tr>
      <td>{props.expenseType}</td>
      <td>{props.date}</td>
      <td style={{fontWeight: 'bold'}}>{props.amount}</td>
      <Button bsStyle="danger" onClick={ props.onDeleteClick } >
        <Glyphicon glyph="remove" />
      </Button >
    </tr>
  )
}

ExpenseItem.propTypes = {
  onDeleteClick : PropTypes.func.isRequired,
  date : PropTypes.string.isRequired,
  expenseType : PropTypes.string.isRequired,
  amount : PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
}

export default ExpenseItem
