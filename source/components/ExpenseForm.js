import React, { PropTypes } from 'react'
import TypeSelector from './TypeSelector'

const ExpenseForm = (props) => {
  let amount, type, date
  return (
    <form onSubmit={e => {
      e.preventDefault()
      props.onValidate(parseInt(amount.value), 'Food')
    }}>
      <label htmlFor="get-amount">Amount :</label>
      <input
        id="get-amount"
        ref={node => amount = node }
        type="number"
      ></input>
      <label htmlFor="get-date">Date :</label>
      <input id="get-date" type="date"></input>
      <TypeSelector expensesTypes={props.expensesTypes}/>
      <button type="submit">Validate</button>
    </form>
  )
}

ExpenseForm.propTypes = {
  expensesTypes : PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onValidate : PropTypes.func.isRequired
}

export default ExpenseForm
