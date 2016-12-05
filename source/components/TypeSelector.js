import React, { PropTypes } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

const TypeSelector = (props) => (
  <FormControl componentClass="select">
    {props.expensesTypes.map(expenseType =>
      <option key={expenseType.id}value={expenseType.id}>{expenseType.label}</option>
    )}
  </FormControl>
)

TypeSelector.propTypes = {
  expensesTypes : PropTypes.arrayOf(PropTypes.shape({
    id : PropTypes.number.isRequired,
    label : PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default TypeSelector
