import { connect } from 'react-redux'
import { deleteExpense } from '../actions'
import ExpenseList from '../components/ExpenseList'

const getMonthlyExpenses = (expenses) => {
  expenses.map((expense) => {
    expense.date = new Date(expense.date).toISOString().substring(0,10)
    return expense
  })

  return expenses
}

const mapStateToProps = (state) => {
  return {
    expenses: getMonthlyExpenses(state.expenses)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: (id) => {
      dispatch(deleteExpense(id))
    }
  }
}

const MonthlyExpenseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseList)

export default MonthlyExpenseList
