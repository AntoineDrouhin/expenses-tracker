import React, { PropTypes } from 'react'
import ExpenseItem from './ExpenseItem'
import { Table, Panel, Col } from 'react-bootstrap'
import CenterPanel from './CenterPanel.component.js'

const ExpenseList = (props) => (
  <CenterPanel >
    <Col mdOffset={1} md={10}>
      <h4>My expenses</h4>
      <Table style={{marginLeft: "auto", marginRight: "auto"}} responsive >
        <tbody >
          {props.expenses.map(expense =>
            <ExpenseItem
              key={expense.id}
              {...expense}
              onDeleteClick={() => props.onDeleteClick(expense.id)} />
          )}
        </tbody >
      </Table >
    </Col>
  </CenterPanel>
)



ExpenseList.propTypes = {
  expenses : PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    expenseType: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }).isRequired).isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default ExpenseList
