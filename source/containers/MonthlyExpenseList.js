import { connect } from 'react-redux'
import { deleteExpense } from '../actions'
import ExpenseList from '../components/ExpenseList'

const getMonthlyExpenses = (expenses, currentTime) => {
  return expenses
  //Atempt to filter expenses based on date
  //return expenses.filter( (expenses) => expenses.date.getTime() > currentTime.getTime() - 1000 * 60 * 60 * 24 * 31 )
}

const mapStateToProps = (state) => {
  return {
    expenses: getMonthlyExpenses(state.expenses, Date.now())
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
