import React, { PropTypes } from 'react'
import { FormControl } from 'react-bootstrap'

const TypeSelector = (props) => (
  <FormControl componentClass="select">
    {props.expenseTypes.items.map(expenseType =>
      <option key={expenseType.id}value={expenseType.id}>{expenseType.label}</option>
    )}
  </FormControl>
)

TypeSelector.propTypes = {
  expenseTypes : PropTypes.shape({
    items : PropTypes.arrayOf(PropTypes.shape({
      id : PropTypes.number.isRequired,
      label : PropTypes.string.isRequired
    }).isRequired).isRequired,
    isInit : PropTypes.bool.isRequired
  }).isRequired
}

export default TypeSelector
