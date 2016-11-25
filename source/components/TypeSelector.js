import React, { PropTypes } from 'react'

const TypeSelector = (props) => (
  <select>
    {props.expensesTypes.map(expenseType =>
      <option key={expenseType.id}>{expenseType.label}</option>
    )}
  </select>
)

TypeSelector.propTypes = {
  expensesTypes : PropTypes.arrayOf(PropTypes.shape({
    id : PropTypes.number.isRequired,
    label : PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default TypeSelector
