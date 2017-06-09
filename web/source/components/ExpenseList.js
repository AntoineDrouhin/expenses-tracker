import React, { PropTypes } from 'react'
import ExpenseItem from './ExpenseItem'
import { Table, Col } from 'react-bootstrap'
import CenterPanel from './CenterPanel'
import TotalExpense from './TotalExpense'
import translate from '../lang/language.js'

const ExpenseList = (props) => {

  if( ! props.expenses.isInit){
    props.syncExpenses()
  }

  const totalAmount = props.expenses.expenseList.reduce((a, b) => a + b.amount, 0)

  return (
    <CenterPanel >
    <h4 className="main-section"> {translate(props.lang, 'MY_EXPENSE')}</h4>
      <Col mdOffset={1} md={10}>

        <Table style={{marginLeft: 'auto', marginRight: 'auto'}} responsive >
          <tbody >
            {props.expenses.expenseList.map(expense =>
              <ExpenseItem
                key={expense._id}
                {...expense}
                onDeleteClick={() => props.onDeleteClick(expense._id)} />
            )}
          </tbody >
        </Table >
      </Col>

      <TotalExpense totalAmount={totalAmount} lang={props.lang} />

    </CenterPanel>
  )
}

ExpenseList.propTypes = {
  expenses : PropTypes.shape({
    expenseList: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      expenseType: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    }).isRequired).isRequired,
    isInit : PropTypes.bool.isRequired
  }),
  onDeleteClick: PropTypes.func.isRequired,
  syncExpenses: PropTypes.func.isRequired,
  lang : PropTypes.string.isRequired
}

export default ExpenseList
