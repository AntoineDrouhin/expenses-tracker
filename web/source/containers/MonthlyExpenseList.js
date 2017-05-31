import { connect } from 'react-redux'
import { removeExpense } from '../actions/expense_asyncActions'
import ExpenseList from '../components/ExpenseList'

const getExpenseList = (expenses) => {

  if (expenses === undefined || expenses === []){
    return []
  }
  
  return expenses.map((expense) => {
    return Object.assign ( {},
      expense,
      { date : new Date(expense.date).toISOString().substring(0,10) }
    )
  })
}

const mapStateToProps = (state) => {
  return {
    expenses: getExpenseList(state.expenses.expenseList)
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
