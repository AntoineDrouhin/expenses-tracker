import { connect } from 'react-redux'
import { removeExpense } from '../actions/expense_asyncActions'
import ExpenseList from '../components/ExpenseList'

const getMonthlyExpenses = (expenses) => {
  expenses.map((expense) => {
    expense.date = new Date(expense.date).toISOString().substring(0,10)
    return expense
  })
  //TODO Fix (map unused)

  return expenses
}

const mapStateToProps = (state) => {
  return {
    expenses: getMonthlyExpenses(state.expenses)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: (_id) => {
      dispatch(removeExpense(_id))
    }
  }
}

const MonthlyExpenseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseList)

export default MonthlyExpenseList
